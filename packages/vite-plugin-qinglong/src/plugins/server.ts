import type { Plugin } from 'vite'
import type { FinalOptions } from '../types'

import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'
import { logger } from '../logger'
import { VITE_BASE_URL } from './config'

export default function (options: FinalOptions): Plugin {
  return {
    name: 'vite-plugin-qinglong:server',
    apply: 'serve',
    async configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl !== VITE_BASE_URL) {
          return next()
        }
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
        logger.info('Redirect to /', { timestamp: true })
      })

      server.middlewares.use(createProxyMiddleware({
        target: options.qlPanel!.baseUrl,
        changeOrigin: true,
        ws: true,
        pathFilter: pathname => !pathname.startsWith(VITE_BASE_URL),
        selfHandleResponse: true,
        on: {
          proxyRes: responseInterceptor(async (responseBuffer, _proxyRes, req) => {
            const isHtml = req.headers.accept?.includes('text/html')
            if (isHtml) {
              logger.info(`Inject hmr client script to ${req.url}`, { timestamp: true })
              const response = responseBuffer.toString('utf8')
              const injectScripts = /* html */ `<head>\n<script type="module" src="${VITE_BASE_URL}/@vite/client"></script>`
              return response.replace('<head>', () => injectScripts)
            }
            return responseBuffer
          }),
        },
      }))
    },
  }
}
