![banner](https://socialify.git.ci/xiaohuohumax/vite-plugin-qinglong/image?font=Bitter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto)

<div align="center">
  <h1>vite-plugin-qinglong</h1>
  <p>
    <a href="https://github.com/xiaohuohumax/vite-plugin-qinglong/blob/main/README_ZH.md">中文文档</a> |
    <a href="https://github.com/xiaohuohumax/vite-plugin-qinglong/blob/main/README.md">English</a>
  </p>
  <p>一个 Vite 插件，用于辅助开发<a href="https://github.com/whyour/qinglong">青龙</a>脚本</p>
</div>

## 🚀 快速开始

1. 安装依赖

```bash
npm i vite-plugin-qinglong -D
```

2. 在 `vite.config.ts` 中配置插件

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
      // 其他配置项...
    }),
  ],
})
```

3. 在 `src/index.ts` 中编写脚本代码

```typescript
console.log('Hello, world!')
```

4. 运行 `npm run dev` 命令，访问 `http://localhost:5173` 即可调试脚本
5. 运行 `npm run build` 命令即可打包脚本
