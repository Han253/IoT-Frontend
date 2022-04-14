import { boot } from 'quasar/wrappers'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { ErrorHandler } from 'src/models'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export function setInterceptors(handler: ErrorHandler) {
  api.interceptors.response.use(undefined, async (error) => {
    if (isNetworkError(error)) {
      handler(503)
    } else {
      const status = error.response.status
      if (status !== 400) {
        handler(status)
      }
    }
    return Promise.reject(error)
  })
}

export function isNetworkError(error: AxiosError) {
  return !error.response
}

export { api }
