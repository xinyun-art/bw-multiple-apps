import fs from 'fs'
import { getCurrentFile, getCurrentDir } from '../../node/path'
interface Options {
  css: CssPaths
}
interface CssPath {
  dynamicImport?: boolean
  url: string
}
type CssPaths = (CssPath | string)[]

const readFiles = (dir: string) => {
  const fileInfo = fs.readdirSync(dir)
  console.log('fileInfo--', fileInfo)

  console.log('__filename--', getCurrentFile())

  console.log('__dirname--', getCurrentDir())
}

export default async function styleInjectPlugin(options: Options) {
  readFiles('src/boot')
  const { css } = options
  console.log('css--', css)
  let pathImps:string = ''
  css.forEach(cssPath => {
    if (typeof cssPath === 'string') {
      pathImps += `import '${cssPath}';`
    } else if (Object.prototype.toString.call(cssPath) === '[object Object]') {
      if (!cssPath.dynamicImport) {
        pathImps += `import '${cssPath.url}';`
      } else {
        pathImps += `import('${cssPath.url}');`
      }
    } else {
      throw new Error('数组项类型只能为string或CssPath对象类型')
    }
  })
  console.log('pathImps--', pathImps)

  return {
    name: 'vite:style-inject',

    enforce: 'pre',

    buildStart() {
      console.log('buildStart--')
    },

    transform(code: any, id: any, opt: any) {
      if (id.endsWith('main.ts')) {
        return `${pathImps};\n${code}`
      }
      return code
    }
  }
}