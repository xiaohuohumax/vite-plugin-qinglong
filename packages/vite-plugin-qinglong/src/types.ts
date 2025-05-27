export interface QlPanelOptions {
  /**
   * Qinglong panel base URL
   */
  baseUrl: string
  /**
   * Qinglong panel client ID
   *
   * @see https://qinglong.online/api/preparation
   */
  clientId: string
  /**
   * Qinglong panel client secret
   * @see https://qinglong.online/api/preparation
   */
  clientSecret: string
  /**
   * Qinglong script filename prefix(dev mode needed)
   *
   * @default 'debug:'
   */
  prefix?: string
}

export interface Options {
  /**
   * Qinglong script entry file path
   */
  entry: string
  /**
   * Qinglong script name
   */
  name: string
  /**
   * Qinglong script version
   *
   * @default '1.0.0'
   */
  version?: string
  /**
   * Qinglong script description
   */
  description?: string
  /**
   * Qinglong script author
   */
  author?: string
  /**
   * Qinglong script output file name
   *
   * @default entry file name
   */
  filename?: string
  /**
   * Whether to minify the script
   *
   * @default false
   */
  minify?: boolean
  /**
   * Qinglong script dependencies
   *
   * @default []
   */
  dependencies?: string[]
  /**
   * Whether to enable adding package dependencies to Qinglong panel
   *
   * @default true
   */
  enableAddPackageDeps?: boolean
  /**
   * Qinglong panel options (dev mode needed)
   */
  qlPanel?: QlPanelOptions
}

export interface FinalQlPanelOptions extends QlPanelOptions {
  prefix: string
}

export interface FinalOptions extends Options {
  version: string
  minify: boolean
  dependencies: string[]
  enableAddPackageDeps: boolean
  qlPanel?: FinalQlPanelOptions
}
