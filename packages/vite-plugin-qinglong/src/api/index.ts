import type { CreateRequestOptions, Response } from './request'
import { createRequest } from './request'

export interface PostScriptsParams {
  filename: string
  content?: string
}

export interface PostCronsParams {
  name: string
  command: string
  schedule: string
}

export interface Cron {
  id: number
  name: string
  command: string
  schedule: string
  status: number
}

export interface GetCronsResult {
  data: Cron[]
}

export interface Dependencies {
  name: string
}

export interface Api {
  postScripts: (params: PostScriptsParams) => Promise<Response<undefined>>
  postCrons: (params: PostCronsParams) => Promise<Response<Cron>>
  getCrons: (search: string) => Promise<Response<GetCronsResult>>
  postDependencies: (params: Dependencies[]) => Promise<Response<undefined>>
  getDependencies: () => Promise<Response<Dependencies[]>>
}

export function createApi(options: CreateRequestOptions): Api {
  const request = createRequest(options)
  return {
    postScripts: data => request({ url: '/open/scripts', method: 'POST', data }),
    postCrons: data => request({ url: '/open/crons', method: 'POST', data }),
    getCrons: search => request({ url: '/open/crons', data: { searchValue: search } }),
    postDependencies: data => request({
      url: '/open/dependencies',
      method: 'POST',
      // type: 0 means 'nodejs'
      data: data.map(item => ({ ...item, type: 0 })),
    }),
    getDependencies: () => request({ url: '/open/dependencies', data: { type: 'nodejs' } }),
  }
}
