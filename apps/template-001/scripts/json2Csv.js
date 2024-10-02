import { Parser } from '@json2csv/plainjs'
import fs from 'node:fs'
import path from 'node:path'

const fileData = fs.readFileSync(path.resolve(process.cwd(), './src/i18n/json/zh.json'), { encoding: 'utf-8' })
console.log('fileData--', fileData)

const dirs = fs.readdirSync(path.resolve(process.cwd(), './src/i18n/json'), { encoding: 'utf-8' })
console.log('dirs--', dirs)

// const stat = fs.statSync(path.resolve(process.cwd(), './src/i18n/json'), { encoding: 'utf-8' })
// console.log('stat--', stat)

// zh-- {
//   k1e7477f9: '这是banner',
//   k4bbe405: '这是content',
//   k88af14eb: '彩票',
//   kf09ed3a9: '体育'
// }

// en-- {
//   k1e7477f9: 'banner',
//   k4bbe405: 'content',
//   k88af14eb: 'cp',
//   kf09ed3a9: 'ty'
// }

// const data2 = [
//   { key: '1', en: '', th:'', vi: '', zh: '' },
//   { key: '2', en: '', th:'', vi: '', zh: '' },
// ]

const readData = () => {
  const dirs = fs.readdirSync(path.resolve(process.cwd(), './src/i18n/json'), { encoding: 'utf-8' })
  let data = {}
  dirs.forEach(filename => {
   const json = fs.readFileSync(path.resolve(process.cwd(), `./src/i18n/json/${filename}`), { encoding: 'utf-8' })
   const key = filename.split('.')[0]
    data[key] = JSON.parse(json)
  })
  console.log('data--', data)
  return data
}
const readDatas = readData()

const keys = Object.keys(JSON.parse(fileData))
console.log('keys--', keys)
const langArr = []
keys.forEach(key => {
  const data = {}
  data.key = key
  data.zh = readDatas.zh[key]
  data.en = readDatas.en[key]
  data.vi = readDatas.vi[key]
  data.th = readDatas.th[key]
  langArr.push(data)
})
console.log('langArr--', langArr)

// const data = [
//   { carModel: 'Audi', price: 0, color: 'blue' },
//   { carModel: 'BMW', price: 15000, color: 'red', manual: true },
//   { carModel: 'Mercedes', price: 20000, color: 'yellow' },
//   { carModel: 'Porsche', price: 30000, color: 'green' }
// ]

const opts = {
  // fields: ['carModel', 'color']
};

const json2csvParser = new Parser(opts)
const csv = json2csvParser.parse(langArr)

console.log(csv)

fs.writeFileSync('./src/i18n/1.csv', csv, 'binary')
