const fs = require('fs')
const { crc32 } = require('crc')

module.exports = {
  input: [
    'src/**/*.{js,ts,jsx,vue}',
    // Use ! to filter out files or directories
    '!src/i18n/**',
    '!**/node_modules/**'
  ],
  output: './', // 输出目录
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ['zh', 'en', 'vi', 'th'],
    defaultLng: 'zh',
    resource: {
      loadPath: './src/i18n/json/{{lng}}.json', // 输入路径
      savePath: './src/i18n/json/{{lng}}.json', // 输出路径
      jsonIndent: 2,
      lineEnding: '\n'
    },
    removeUnusedKeys: true, // 移除未使用的 key
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  // 自己通过该函数来加工key或value
  transform: function customTransform(file, enc, done) {
    'use strict'
    const parser = this.parser
    const content = fs.readFileSync(file.path, enc)
    /**
     * @param {list} array 指定扫描的标识
     */
    parser.parseFuncFromString(content, { list: ['lang', 't'] }, (key, options) => {
      options.defaultValue = key
      // 将传入的文字转成配置的 key，不一定非用 crc，别的也行，如果内容不会影响 json 格式，不用也行
      const hashKey = `k${crc32(key).toString(16)}`
      parser.set(hashKey, options)
    })
    done()
  }
}