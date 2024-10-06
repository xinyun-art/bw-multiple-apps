// https://github.com/Keyang/node-csvtojson
// https://cloud.tencent.com/developer/article/2218845
import path from 'node:path'
import fs from 'node:fs'
import csvtojson from 'csvtojson'

const jsonDirPath = path.resolve(process.cwd(), './src/i18n/json')
const csvFilePath = path.resolve(process.cwd(), './src/i18n/i18n.csv')
// console.log('csvFilePath--', csvFilePath)

const jsons = await csvtojson().fromFile(csvFilePath)
// console.log('jsons--', jsons)
// [
//  { key: 'kd8ec8984', en: '这是宣传图en', th: '这是宣传图th', vi: '这是宣传图vi', zh: '这是宣传图zh' },
//  { key: 'ka091b31c', en: '这是内容区en', th: '这是内容区th', vi: '这是内容区vi', zh: '这是内容区zh' },
//  ...
// ]
let jsonDir = fs.readdirSync(jsonDirPath)
jsonDir = jsonDir.filter(dir => !dir.startsWith('.')) // 过滤掉 诸如 .DS_Store 之类的文件
// console.log('jsonDir--', jsonDir)

const jsonFilesData = {}
jsonDir.forEach((filename) => {
  const fileKey = filename.split('.')[0]
  jsonFilesData[fileKey] = {}
})

for (const fileKey in jsonFilesData) {
  jsons.forEach((json) => {
    jsonFilesData[fileKey][json.key] = json[fileKey]
  })
}
// console.log('jsonFilesData--', jsonFilesData)

Object.keys(jsonFilesData).forEach((jsonFilename) => {
  const jsonFilePath = path.resolve(jsonDirPath, `${jsonFilename}.json`)
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonFilesData[jsonFilename], null, 2), 'utf8')
})
