/**
 * 数据加密算法
 * 原数据->JSON->GZIP压缩->Aes加密->所以无需在Base64加密
 *
 * 签名生成
 * sign = （加密之后的string数据 + nonce + timestamp）-> HmacSHA1加密 -> Base64加密
 */
import CryptoJS from 'crypto-js'
// import HmacSHA1 from 'crypto-js/hmac-sha1'
import md5 from 'js-md5'
import pako from 'pako'

const dataHandle = function () {}
// 当前的默认密钥
const defaultKey = import.meta.env.VITE_APP_KEY
/**
 * 数据加密
 * param { data } 明文JSON字符串
 * param { key } 当前加密算法通用密钥
 */
dataHandle.encrypt = function (data, key = defaultKey) {
  if (typeof data !== 'string') {
    data = JSON.stringify(data)
  }
  // 将秘钥转换成Utf8字节数组
  const commonKey = CryptoJS.enc.Utf8.parse(key)
  // zip压缩数据
  // console.log('data', data, typeof data)
  const zipData = zip(data)
  // console.log('zipData', zipData, typeof zipData)
  // aes加密 直接输出Base64加密的数据 所以无需在Base64加密
  const aesEncryptData = aesEncrypt(zipData, commonKey)
  // console.log('aesEncryptData', aesEncryptData)
  return aesEncryptData
}

/**
 * 生成签名
 * param { data } 加密后数据
 * param { nonce } long整型 随机数
 * param { timestamp } 当前时间戳
 * param { key } 生成签名的密钥 当前应该是和加密的密钥是同一个
 */
dataHandle.createSign = function (data, nonce, timestamp, key) {
  // sign 字符串
  const sign = data + key + nonce + timestamp

  // hmacSHA1加密 -- 这里不需要做任何转吗，CryptoJS底层默认会转UTF-8
  const sha1Data = md5(md5(sign))

  // base64 加密数据
  // const base64Data = CryptoJS.enc.Base64.stringify(sha1Data)

  return sha1Data
}

/**
 * 创建long整型随机数
 * Java端说 只需要0-MaxValue就可以了
 */
dataHandle.createNonce = function () {
  return Math.round(Math.random() * Math.pow(2, 63))
}

/**
 * 创建时间戳
 * TODO 再次之前应该向服务器拉取服务器时间，之后校验本地时间
 */
dataHandle.createTimestamp = function () {
  return new Date().getTime()
}

/**
 * aesjson数据解密
 * param { data } 加密数据
 * param { key } 当前加密算法通用密钥
 */
dataHandle.decrypt = function (data, key) {
  // 将秘钥转换成Utf8字节数组
  const commonKey = CryptoJS.enc.Utf8.parse(key)

  // aes解密
  const aesData = aesDecrypt(data, commonKey)

  // GZIP解密
  const gzipData = unzip(aesData)
  // console.log('gzipData', gzipData)
  return gzipData
}

/**
 * 图片解密，后端未压缩，所以不需要解压
 * param { data } 加密数据
 * param { key } 当前加密算法通用密钥
 */
dataHandle.decryptImg = function (data, key) {
  // 将秘钥转换成Utf8字节数组
  const commonKey = CryptoJS.enc.Utf8.parse(key)
  // aes解密
  const decrypt = CryptoJS.AES.decrypt(data, commonKey, {
    iv: commonKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypt.toString(CryptoJS.enc.Utf8).toString()
  // return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

// gzip压缩 gzip 传入的参数只要不是string都是会直接崩溃的
function zip(str) {
  // string 输出字符串
  // [object ArrayBuffer] 输出Unit8Array
  const binary = pako.gzip(str, { to: '[object ArrayBuffer]' })
  return binary
}

// gzip解压
function unzip(key) {
  // GZIP解压
  const data = pako.inflate(key)
  // 16进制字节流 转wordArray
  const wordArray = typeArrayToWordArray(data)
  // wordArray 转UTF-8
  const str = CryptoJS.enc.Utf8.stringify(wordArray)

  return str
}

// aes加密
function aesEncrypt(zipData, key) {
  // Uint8Array的数据转成WordArray的数据
  if (typeof zipData !== 'string') {
    zipData = typeArrayToWordArray(zipData)
  }

  // 这里key一定要转UTF-8 否则会发现每次Aes结果都不一样 没找到原因
  // 这里的加密模式是CBC 虽然他们文档写的ECB 但是Java后端全都是CBC的
  // padding 数据对齐方式后端是cs5 前端此时选择cs7结果都是一样的，这个一定是没问题的，另一个原因是前端只有cs7，说是cs7和cs5几乎没区别。
  const encrypt = CryptoJS.AES.encrypt(zipData, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypt.toString()
}

/**
 * aes解密json数据
 */
export function aesDecrypt(data, key) {
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  // 这里转成Unit8Array方便Gzip解压
  const bytesArray = wordToBytesArray(decrypt)
  return bytesArray
}

// typedArrayToWordArray 字节数组转word数组
function typeArrayToWordArray(u8arr) {
  // Shortcut
  const len = u8arr.length
  // Convert
  const words = []
  for (let i = 0; i < len; i++) {
    words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8)
  }
  return CryptoJS.lib.WordArray.create(words, len)
}

// wordArray 转 字节数组
const wordToBytesArray = function (wordArray) {
  // Shortcuts
  const words = wordArray.words
  const sigBytes = wordArray.sigBytes
  // Convert
  const u8 = new Uint8Array(sigBytes)
  for (let i = 0; i < sigBytes; i++) {
    const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
    u8[i] = byte
  }
  return u8
}

export default dataHandle
