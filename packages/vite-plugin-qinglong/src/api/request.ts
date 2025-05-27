export interface CreateRequestOptions {
  baseUrl: string
  clientId: string
  clientSecret: string
}

export interface RequestOptions<D = any> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: D
}

export type Request<D = any, T = any> = (requestOptions: RequestOptions<D>) => Promise<Response<T>>

export interface Response<T> {
  code: number
  data: T
  message?: string
}

export interface TokenData {
  token: string
  expiration: number
}

export const AUTH_TOKEN_URL = '/open/auth/token'

export function createRequest(options: CreateRequestOptions) {
  let token: string | undefined
  let expirationAt: number | undefined

  const isTokenUrl = (url: string) => url.startsWith(AUTH_TOKEN_URL)
  const isExpired = () => token && expirationAt! <= Math.floor(Date.now() / 1000)

  async function refreshToken() {
    const response = await request<any, TokenData>({
      url: AUTH_TOKEN_URL,
      data: {
        client_id: options.clientId,
        client_secret: options.clientSecret,
      },
    })
    token = response.data!.token
    expirationAt = response.data!.expiration
  }

  async function request<D = any, T = any>(requestOptions: RequestOptions<D>): Promise<Response<T>> {
    if ((!token || isExpired()) && !isTokenUrl(requestOptions.url)) {
      await refreshToken()
    }

    let data = requestOptions.data
    let url = options.baseUrl + requestOptions.url
    const method = requestOptions.method || 'GET'

    if (method === 'GET' && data) {
      url += `?${new URLSearchParams(data).toString()}`
      data = undefined
    }

    const headers = new Headers()
    token && headers.set('Authorization', `Bearer ${token}`)
    headers.set('Content-Type', 'application/json')

    const response = await fetch(url, {
      method: requestOptions.method || 'GET',
      headers,
      body: data
        ? JSON.stringify(data)
        : undefined,
    })

    const res = await response.json() as Response<T>

    if (res.code !== 200) {
      throw new Error(`Fetch ${requestOptions.url} failed: ${res.code} ${res.message}`)
    }

    return res
  }

  return request
}
