import dataHandle from './encrypt'

/**
 * 请求参数加密
 * @param {} config axios请求配置
 */
export const encryptRequestData = config => {
  const encryptedData = encryptData(config.data)
  const nonce = dataHandle.createNonce()
  const timestamp = dataHandle.createTimestamp()
  const sign = dataHandle.createSign(
    encryptedData,
    nonce,
    timestamp,
    import.meta.env.VITE_APP_KEY
  )
  config.headers['ob-nonce'] = nonce
  config.headers['ob-timestamp'] = timestamp
  config.headers['ob-sign'] = sign
  config.data = encryptedData

  return config
}

// 数据加密
export const encryptData = data => {
  data = data || data * 1 === 0 ? data : {}
  return dataHandle.encrypt(JSON.stringify(data), import.meta.env.VITE_APP_KEY)
}

/**
 * 数据解密
 * @param {string} data
 */
export const decryptData = data => {
  return dataHandle.decrypt(data, import.meta.env.VITE_APP_KEY)
}
