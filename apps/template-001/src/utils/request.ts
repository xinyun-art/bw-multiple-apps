import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig
} from 'axios'

interface InterceptorHooks {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
interface IRequestConfig extends AxiosRequestConfig {
  interceptorHooks: InterceptorHooks
}

class HttpRequest {
  config: IRequestConfig
  instance: AxiosInstance

  constructor(config: IRequestConfig) {
    this.config = config
    this.instance = axios.create(config)

    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  httpInterceptorsRequest(): void {
    // 创建实例时手动传入的自定义拦截器
    this.instance.interceptors.request.use(
      this.config.interceptorHooks?.requestInterceptor,
      this.config.interceptorHooks?.requestInterceptorCatch
    )
    // 所有实例共有的公共请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      async (error) => {
        return Promise.reject(error)
      }
    )
  }

  httpInterceptorsResponse(): void {
    // 创建实例时手动传入的自定义拦截器
    this.instance.interceptors.response.use(
      this.config.interceptorHooks?.responseInterceptor,
      this.config.interceptorHooks?.responseInterceptorCatch
    )
    // 所有实例共有的公共响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

export default HttpRequest
