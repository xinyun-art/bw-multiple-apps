// https://github.com/juanjoDiaz/json2csv?tab=readme-ov-file
import { Parser } from '@json2csv/plainjs'
import fs from 'node:fs'
import path from 'node:path'
// import { fileURLToPath } from "node:url"

// console.log('process.cwd()--', process.cwd()) // node命令在哪个目录下执行的，process.cwd() 输出的路径就是哪个。

// // 运行会得到一个基于 file 协议的 URL：file:///Users/kaitan/Documents/demo/bw-multiple-apps/apps/template-001/scripts/json2Csv.js
// console.log('import.meta.url--', import.meta.url)
// // 把 file 协议转换成路径，我们需要借助 Node.js 内部 url 模块的 fileURLToPath API。
// // 运行得到路径：/Users/kaitan/Documents/demo/bw-multiple-apps/apps/template-001/scripts/json2Csv.js
// console.log('fileURLToPath(import.meta.url)--', fileURLToPath(import.meta.url));

// // 通过 import.meta.url 和 fileURLToPath 我们能很容易模仿 __filename API。
// const __filename = fileURLToPath(import.meta.url);
// console.log('__filename--', __filename)
// // 拿到了 __filename 的值，实现 __dirname 就简单了，借助 Node.js 的内部模块 path 的 dirname 方法来实现：
// const __dirname = path.dirname(__filename)
// console.log('__dirname--', __dirname)

// const stat = fs.statSync(path.resolve(process.cwd(), './src/i18n/json'), { encoding: 'utf-8' })
// console.log('stat--', stat)

const readData = () => {
  const dirnameOfI18n = path.resolve(path.resolve(process.cwd(), './src/i18n/json'))
  let dirs = fs.readdirSync(dirnameOfI18n, { encoding: 'utf-8' })
  dirs = dirs.filter(dir => !dir.startsWith('.')) // 过滤掉 诸如 .DS_Store 之类的文件
  console.log('dirs--', dirs)

  let data = {}
  dirs.forEach(filename => {
    const filenameOfI18n = path.resolve(dirnameOfI18n, `${filename}`)
    const pathInfo = path.parse(filenameOfI18n)
    // console.log('pathInfo--', pathInfo)

    const jsonData = fs.readFileSync(filenameOfI18n, { encoding: 'utf-8' })
    data[pathInfo.name] = JSON.parse(jsonData)
  })
  return data
}
const i18nAllJsonData = readData()
console.log('i18nAllJsonData--', i18nAllJsonData)
// i18nAllJsonData-- {
//   en: {
//     kd8ec8984: '这是宣传图en',
//     ka091b31c: '这是内容区en',
//     ...
//   },
//   th: {
//     kd8ec8984: '这是宣传图th',
//     ka091b31c: '这是内容区th',
//     ...
//   },
//   vi: {
//     kd8ec8984: '这是宣传图vi',
//     ka091b31c: '这是内容区vi',
//     ...
//   },
//   zh: {
//     kd8ec8984: '这是宣传图zh',
//     ka091b31c: '这是内容区zh',
//     ...
//   }
// }

let jsonArr = null
for (const langKey in i18nAllJsonData) {
  const jsonData = i18nAllJsonData[langKey]
  // 遍历第一个数据时，将 jsonArr 数据组装成：
  // [
  //  { key: 'kd8ec8984', en: '这是宣传图en' },
  //  { key: 'ka091b31c', en: '这是内容区en' },
  //  { key: 'k88af14eb', en: '彩票en' },
  //  { key: 'kf09ed3a9', en: '体育en' },
  // ]
  if (jsonArr === null) {
    jsonArr = Object.keys(jsonData).map(key => ({ key, [langKey]: jsonData[key] }))
    continue // 跳出第一次循环
  }
  // 第二次以及之后的所有循环
  jsonArr.forEach(json => {
    json[langKey] = jsonData[json.key]
  })
}
console.log('jsonArr--', jsonArr)

// json2csvParser需要的数据格式：
// const data = [
//   { key: 'kd8ec8984', en: '这是宣传图en', th: '这是宣传图th', vi: '这是宣传图vi', zh: '这是宣传图zh' },
//   { key: 'ka091b31c', en: '这是内容区en', th: '这是内容区th', vi: '这是内容区vi', zh: '这是内容区zh' },
//   ...
// ]

const opts = {
  // fields: ['carModel', 'color']
};

const json2csvParser = new Parser(opts)
const csv = json2csvParser.parse(jsonArr)

console.log(csv)
// "key","en","th","vi","zh"
// "kd8ec8984","这是宣传图en","这是宣传图th","这是宣传图vi","这是宣传图zh"
// "ka091b31c","这是内容区en","这是内容区th","这是内容区vi","这是内容区zh"
// "k88af14eb","彩票en","彩票th","彩票vi","彩票zh"
// "kf09ed3a9","体育en","体育th","体育vi","体育zh"

// fs.writeFileSync('./src/i18n/i18n.csv', csv, 'utf8')
// fs.writeFileSync('./src/i18n/i18n.csv', `\ufeff${csv}`, 'utf8')
