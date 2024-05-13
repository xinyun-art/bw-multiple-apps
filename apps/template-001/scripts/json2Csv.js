import { Parser } from '@json2csv/plainjs'
import fs from 'node:fs'
import path from 'node:path'

const fileData = fs.readFileSync(path.resolve(process.cwd(), './src/i18n/json/zh.json'), { encoding: 'utf-8' })
console.log('fileData--', JSON.parse(fileData))

const dirs = fs.readdirSync(path.resolve(process.cwd(), './src/i18n/json'), { encoding: 'utf-8' })
console.log('dirs--', dirs)

const stat = fs.statSync(path.resolve(process.cwd(), './src/i18n/json'), { encoding: 'utf-8' })
console.log('stat--', stat)

const readFiles = (dir, readSubDir = false, ext = ['.js']) => {
  if (!dir) throw new Error('目录名不能为空')
  
  return {
    path: '',
    data: {}
  }
}

const data = [
  { carModel: 'Audi', price: 0, color: 'blue' },
  { carModel: 'BMW', price: 15000, color: 'red', manual: true },
  { carModel: 'Mercedes', price: 20000, color: 'yellow' },
  { carModel: 'Porsche', price: 30000, color: 'green' }
]

// const data2 = [
//   { key: '1', en: '', th:'', vi: '', zh: '' },
//   { key: '2', en: '', th:'', vi: '', zh: '' },
// ]

const opts = {
  fields: ['carModel', 'color']
};

const json2csvParser = new Parser(opts)
const csv = json2csvParser.parse(data)

console.log(csv)

fs.writeFileSync('./src/i18n/1.csv', csv, 'binary')