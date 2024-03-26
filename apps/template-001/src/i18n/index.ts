import { createI18n } from 'vue-i18n'
import messages from './messages'
import crc32 from 'crc/crc32'
// import { CRC32 as crc32 } from 'crc_32_ts'
import type { App } from 'vue'

const language = 'en'

console.log('messages--', messages)

const i18n = createI18n({
  locale: language, // 设置当前语言类型
  fallbackLocale: language,
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false。
  // globalInjection: true, // 全局注册$t方法
  messages
})
console.log('i18n--', i18n)

export function lang(key: string): string {
  const hashKey = `k${crc32(key).toString(16)}`
  let words = i18n.global.t(hashKey)
  if (words === hashKey) {
    words = key
    console.log(key, '-未翻译')
  }
  return words
}

// - 单独声明一个函数用于格式化翻译 不进行扫描
export function _lang(key: string, values?: any): any {
  return i18n.global.t(key, values)
}

export const setupI18n = (app: App<Element>): void => {
  app.use(i18n)
}

export default i18n