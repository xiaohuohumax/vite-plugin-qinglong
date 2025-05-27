import type { Plugin } from 'vite'
import type { FinalOptions, Options } from './types'
import plugins from './plugins'
import { readPackageDeps } from './utils'

function normalizeOptions(options: Options): FinalOptions {
  const { version, minify, dependencies, enableAddPackageDeps, qlPanel } = options
  return {
    ...options,
    version: version ?? '1.0.0',
    minify: minify ?? false,
    dependencies: dependencies ?? [],
    enableAddPackageDeps: enableAddPackageDeps ?? true,
    qlPanel: qlPanel
      ? {
          ...qlPanel,
          prefix: qlPanel.prefix ?? 'debug:',
        }
      : undefined,
  }
}

export default async function (options: Options): Promise<Plugin[]> {
  const finalOptions: FinalOptions = normalizeOptions(options)

  if (finalOptions.enableAddPackageDeps) {
    finalOptions.dependencies.push(...(await readPackageDeps()))
  }

  return plugins.map(plugin => plugin(finalOptions))
}
