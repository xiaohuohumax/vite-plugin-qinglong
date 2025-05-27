import type { Plugin } from 'vite'
import type { FinalOptions } from '../types'
import { options2banner } from '../utils'

export default function (options: FinalOptions): Plugin {
  return {
    name: 'vite-plugin-qinglong:bundle',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk' || !output.isEntry) {
          continue
        }
        output.code = `${options2banner(options)}\n\n${output.code}`
      }
    },
  }
}
