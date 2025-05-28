import { defineConfig } from 'vite'
import qinglong from 'vite-plugin-qinglong'

export default defineConfig({
  plugins: [
    qinglong({
      entry: 'src/index.js',
      name: 'Vite Empty Starter',
      qlPanel: {
        baseUrl: 'http://localhost:5700',
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret',
      },
    }),
  ],
})
