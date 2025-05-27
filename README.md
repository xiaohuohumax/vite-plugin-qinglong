![banner](https://socialify.git.ci/xiaohuohumax/vite-plugin-qinglong/image?font=Bitter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto)

<div align="center">
  <h1>vite-plugin-qinglong</h1>
  <p>
    <a href="https://github.com/xiaohuohumax/vite-plugin-qinglong/blob/main/README_ZH.md">中文文档</a> |
    <a href="https://github.com/xiaohuohumax/vite-plugin-qinglong/blob/main/README.md">English</a>
  </p>
  <p>A Vite plugin for developing <a href="https://github.com/whyour/qinglong">Qinglong</a> scripts</p>
</div>

## 🚀 Quick Start

1. Install dependencies

```bash
npm install vite-plugin-qinglong -D
```

2. Add plugin to `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import qinglong from 'vite-plugin-qinglong'

export default defineConfig({
  plugins: [
    qinglong({
      entry: 'src/index.ts',
      name: 'Script name',
      qlPanel: {
        baseUrl: 'http://localhost:5700',
        clientId: '',
        clientSecret: '',
      },
      // other options...
    }),
  ],
})
```

3. Write your script in `src/index.ts`

```typescript
console.log('Hello, world!')
```

4. Run `npm run dev` command and visit `http://localhost:5173` to debug your script.
5. Run `npm run build` command to build your script.
