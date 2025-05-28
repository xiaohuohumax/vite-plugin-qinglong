import { defineConfig } from 'vite'
import qinglong from 'vite-plugin-qinglong'

export default defineConfig({
  plugins: [
    qinglong({
      entry: 'src/index.ts',
      name: 'Vite Empty TS Starter',
      qlPanel: {
        baseUrl: 'http://localhost:5700',
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret',
      },
    }),
  ],
})
