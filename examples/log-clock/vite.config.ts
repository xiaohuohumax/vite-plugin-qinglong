import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import qinglong from 'vite-plugin-qinglong'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      qinglong({
        entry: 'src/index.ts',
        name: 'Log Clock',
        version: '0.0.1',
        description: 'A simple clock with log output',
        author: 'xiaohuohumax',
        filename: 'log-clock',
        qlPanel: {
          baseUrl: env.VITE_QL_BASE_URL,
          clientId: env.VITE_QL_CLIENT_ID,
          clientSecret: env.VITE_QL_CLIENT_SECRET,
        },
      }),
    ],
  }
})
