import HttpRequest from '@/utils/request'
import dataHandle from '@/utils/encrypt/encrypt'

const { SITE_BASE_API, SITE_MERCHANT_ID, SITE_CURRENCY, SITE_SECRET_VERSION } = import.meta.env
console.log('api-SITE_BASE_API--', SITE_BASE_API)
console.log('api-SITE_MERCHANT_ID--', SITE_MERCHANT_ID)
console.log('api-SITE_CURRENCY--', SITE_CURRENCY)
console.log('api-SITE_SECRET_VERSION--', SITE_SECRET_VERSION)

const http = new HttpRequest({
  baseURL: SITE_BASE_API,
  timeout: 15000,
  interceptorHooks: {
    requestInterceptor: (config) => {
      console.log('request.interceptors.request-config===', config)
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
      config.headers['X-Request-Token'] = ''
      config.headers['lang'] = 'zh_CN'
      config.headers['merchant-id'] = SITE_MERCHANT_ID
      config.headers['currency'] = SITE_CURRENCY
      // 设备类型  1 // 1:[pc], 2:[h5], 3:[ios], 4:[android], 5:[other]
      config.headers['ob-client'] = 1
      // 应用号
      config.headers['ob-application'] = 62
      config.headers['ob-secret-version'] = SITE_SECRET_VERSION

      config.headers['ob-encrypted'] = 'false'
      config.headers['ob-nonce'] = dataHandle.createNonce()
      config.headers['ob-timestamp'] = dataHandle.createTimestamp()
      return config
    },
    requestInterceptorCatch: (error) => {
      return Promise.reject(error)
    },
    responseInterceptor: (response) => {
      console.log('request.interceptors.response-response===', response)
      return response.data
    },
    responseInterceptorCatch: (error) => {
      return Promise.reject(error)
    }
  }
})

export default http.instance
