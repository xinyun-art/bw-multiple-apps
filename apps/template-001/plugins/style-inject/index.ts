import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

export const getCurrentFile = () => fileURLToPath(import.meta.url)

export const getCurrentDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return __dirname
}

interface Options {
  css: CssPaths
}
interface CssPath {
  dynamicImport?: boolean
  url: string
}
type CssPaths = (CssPath | string)[]

const readFiles = (dir: string) => {
  const files = fs.readdirSync(dir)
  console.log('files--', files)

  const paths = files.map(filename => resolve(process.cwd(), dir, filename))
  console.log('paths--', paths)
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