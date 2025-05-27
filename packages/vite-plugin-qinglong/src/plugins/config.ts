import type { Plugin } from 'vite'
import type { FinalOptions } from '../types'

export const VITE_BASE_URL = '/@ql'

export default function (options: FinalOptions): Plugin {
  return {
    name: 'vite-plugin-qinglong:config',
    async config(config, env) {
      config.base = VITE_BASE_URL
      if (env.command === 'build') {
        config.build = {
          ...config.build,
          rollupOptions: {
            ...config.build?.rollupOptions,
            input: options.entry,
            output: {
              ...config.build?.rollupOptions?.output,
              entryFileNames: options.filename
                ? `${options.filename}.js`
                : '[name].js',
            },
            external: options.dependencies.map(d => d.split('@')[0]),
          },
          minify: options.minify,
        }
      }
      else if (!options.qlPanel) {
        throw new Error('qlPanel is required in development mode')
      }
    },
  }
}
