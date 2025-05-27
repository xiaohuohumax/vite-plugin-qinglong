import type { Plugin, Rollup } from 'vite'
import type { Dependencies } from '../api'
import type { FinalOptions } from '../types'

import path from 'node:path'
import process from 'node:process'
import { build, normalizePath } from 'vite'
import { createApi } from '../api'
import { logger } from '../logger'
import { debounce } from '../utils'

export default function (options: FinalOptions): Plugin {
  const api = createApi(options.qlPanel!)

  const prefix = options.qlPanel!.prefix
  const entryParse = path.parse(options.entry)
  const filename = `${options.filename || entryParse.name}.js`
  const debugFilename = `${prefix}${filename}`

  return {
    name: 'vite-plugin-qinglong:debug',
    apply: 'serve',
    async configureServer(server) {
      let cacheCode: string | undefined

      async function buildScriptCode(): Promise<string> {
        const { output } = await build({
          logLevel: 'error',
          build: { write: false },
        }) as Rollup.RollupOutput
        const chunk = output.find(chunk => chunk.fileName === filename) as Rollup.OutputChunk
        if (!chunk) {
          throw new Error(`Can not find chunk with filename ${filename}`)
        }
        return chunk.code
      }

      async function handleFileChange(file?: string) {
        if (file) {
          logger.info(`File changed: ${normalizePath(path.relative(process.cwd(), file))}`, { timestamp: true })
        }

        const code = await buildScriptCode()

        if (code === cacheCode) {
          return
        }

        // install dependencies
        if (options.dependencies && options.dependencies.length > 0) {
          const { data: installedDependencies } = await api.getDependencies()

          const installedDependencyNames = installedDependencies.map(dep => dep.name)

          const dependencies: Dependencies[] = options.dependencies
            .filter(dep => !installedDependencyNames.includes(dep))
            .map(dep => ({ name: dep }))

          if (dependencies.length > 0) {
            await api.postDependencies(dependencies)
            logger.info(`Installed dependencies: ${dependencies.map(dep => dep.name).join(', ')}`)
          }
        }

        // create cron task
        const { data: { data: crons } } = await api.getCrons(debugFilename)
        const cron = crons.find(cron => cron.command === debugFilename)

        if (!cron) {
          await api.postCrons({
            name: options.name,
            command: debugFilename,
            schedule: '@once',
          })
          logger.info(`Created cron task: ${options.name}`, { timestamp: true })
        }

        // update script content
        await api.postScripts({
          filename: debugFilename,
          content: code,
        })
        logger.info(`Created script: ${debugFilename}`, { timestamp: true })

        cacheCode = code
        server.ws.send({ type: 'full-reload' })
      }

      const debouncedHandleFileChange = debounce(
        (file?: string) => handleFileChange(file)
          .catch(err => logger.error(err, { timestamp: true })),
        1000,
      )
      debouncedHandleFileChange()

      server.watcher.on('change', debouncedHandleFileChange)
    },
  }
}
