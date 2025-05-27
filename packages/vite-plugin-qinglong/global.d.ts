/**
 * Built-in API
 * The global variable QLAPI is the entry point for built-in APIs.
 */

/**
 * Interface for the request to retrieve environments.
 */
interface GetEnvsRequest {
  /**
   * Search keyword.
   */
  searchValue: string
}

/**
 * Interface for an environment item.
 */
interface EnvItem {
  /**
   * Environment ID.
   */
  id?: number

  /**
   * Environment name.
   */
  name?: string

  /**
   * Environment value.
   */
  value?: string

  /**
   * Remarks for the environment.
   */
  remarks?: string

  /**
   * Status of the environment.
   */
  status?: number

  /**
   * Position of the environment.
   */
  position?: number
}

/**
 * Interface for the standard response.
 */
interface QLResponse {
  /**
   * QLResponse code.
   */
  code: number

  /**
   * QLResponse message.
   */
  message?: string
}

/**
 * Interface for the response containing a list of environments.
 * @extends {QLResponse}
 */
interface EnvsResponse extends QLResponse {
  /**
   * Environment list.
   */
  data: EnvItem[]
}

/**
 * Interface for the response containing a single environment.
 * @extends {QLResponse}
 */
interface EnvResponse extends QLResponse {
  /**
   * Updated environment.
   */
  data: EnvItem
}

/**
 * Interface for the request to create environments.
 */
interface CreateEnvRequest {
  /**
   * Array of environments to create.
   */
  envs: EnvItem[]
}

/**
 * Interface for the request to update an environment.
 */
interface UpdateEnvRequest {
  /**
   * Environment to update.
   */
  env: EnvItem
}

/**
 * Interface for the request to delete environments.
 */
interface DeleteEnvsRequest {
  /**
   * Array of environment IDs to delete.
   */
  ids: number[]
}

/**
 * Interface for the request to move an environment.
 */
interface MoveEnvRequest {
  /**
   * Environment ID.
   */
  id: number

  /**
   * Original position.
   */
  fromIndex: number

  /**
   * Target position.
   */
  toIndex: number
}

/**
 * Interface for the request to disable environments.
 */
interface DisableEnvsRequest {
  /**
   * Array of environment IDs to disable.
   */
  ids: number[]
}

/**
 * Interface for the request to enable environments.
 */
interface EnableEnvsRequest {
  /**
   * Array of environment IDs to enable.
   */
  ids: number[]
}

/**
 * Interface for the request to update environment names.
 */
interface UpdateEnvNamesRequest {
  /**
   * Array of environment IDs.
   */
  ids: number[]

  /**
   * New name to set.
   */
  name: string
}

/**
 * Interface for the request to retrieve an environment by its ID.
 */
interface GetEnvByIdRequest {
  /**
   * Environment ID.
   */
  id: number
}

/**
 * Interface for the request to send system notifications.
 */
interface SystemNotifyRequest {
  /**
   * Notification title.
   */
  title: string

  /**
   * Notification content.
   */
  content: string
}

/**
 * Interface for the QLAPI entry point.
 */
interface QlApi {
  /**
   * Sends a notification to the user.
   * @param {string} title - Notification title.
   * @param {string} content - Notification content.
   * @param {Record<string, any>} [params] - Additional parameters.
   */
  notify: (title: string, content: string, params?: Record<string, any>) => void

  /**
   * Retrieves a list of environments.
   * @param {GetEnvsRequest} request - Request parameters.
   * @returns {Promise<EnvsResponse>} - Environment list response.
   */
  getEnvs: (request: GetEnvsRequest) => Promise<EnvsResponse>

  /**
   * Creates new environments.
   * @param {CreateEnvRequest} request - Request parameters.
   * @returns {Promise<EnvsResponse>} - Created environments response.
   */
  createEnv: (request: CreateEnvRequest) => Promise<EnvsResponse>

  /**
   * Updates an existing environment.
   * @param {UpdateEnvRequest} request - Request parameters.
   * @returns {Promise<EnvResponse>} - Updated environment response.
   */
  updateEnv: (request: UpdateEnvRequest) => Promise<EnvResponse>

  /**
   * Deletes specified environments.
   * @param {DeleteEnvsRequest} request - Request parameters.
   * @returns {Promise<QLResponse>} - Delete environments response.
   */
  deleteEnvs: (request: DeleteEnvsRequest) => Promise<QLResponse>

  /**
   * Moves an environment to a different position.
   * @param {MoveEnvRequest} request - Request parameters.
   * @returns {Promise<EnvResponse>} - Moved environment position response.
   */
  moveEnv: (request: MoveEnvRequest) => Promise<EnvResponse>

  /**
   * Disables specified environments.
   * @param {DisableEnvsRequest} request - Request parameters.
   * @returns {Promise<QLResponse>} - Disable environments response.
   */
  disableEnvs: (request: DisableEnvsRequest) => Promise<QLResponse>

  /**
   * Enables specified environments.
   * @param {EnableEnvsRequest} request - Request parameters.
   * @returns {Promise<QLResponse>} - Enable environments response.
   */
  enableEnvs: (request: EnableEnvsRequest) => Promise<QLResponse>

  /**
   * Updates names for specified environments.
   * @param {UpdateEnvNamesRequest} request - Request parameters.
   * @returns {Promise<QLResponse>} - Update environment names response.
   */
  updateEnvNames: (request: UpdateEnvNamesRequest) => Promise<QLResponse>

  /**
   * Retrieves an environment by its ID.
   * @param {GetEnvByIdRequest} request - Request parameters.
   * @returns {Promise<EnvResponse>} - Environment response.
   */
  getEnvById: (request: GetEnvByIdRequest) => Promise<EnvResponse>

  /**
   * Sends system notifications.
   * @param {SystemNotifyRequest} request - Request parameters.
   * @returns {Promise<QLResponse>} - System notification response.
   */
  systemNotify: (request: SystemNotifyRequest) => Promise<QLResponse>

  // TODO: other APIs
  // getCronDetail: [AsyncFunction (anonymous)]
  // createCron: [AsyncFunction (anonymous)]
  // updateCron: [AsyncFunction (anonymous)]
  // deleteCrons: [AsyncFunction (anonymous)]
  // close: [Function: bound close]
}

declare const QLAPI: QlApi
