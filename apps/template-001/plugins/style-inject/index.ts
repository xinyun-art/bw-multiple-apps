import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

export const getCurrentFile = () => fileURLToPath(import.meta.url)

export const getCurrentDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return __dirname
}

interface Options {
  css: CssPaths,
  boot?: string[]
}
interface CssPath {
  dynamicImport?: boolean
  url: string
}
type CssPaths = (CssPath | string)[]

const transformPathsToStr = (dir: string, paths: string[]): string[] => {
  return paths.map(path => resolve(process.cwd(), dir, path))
}

const getSameItemFormArray = <T>(arr1: T[], arr2: T[]): T[] => {
  const sameArr: T[] = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j] && !sameArr.includes(arr1[i])) {
        sameArr.push(arr1[1])
      }
    }
  }
  return sameArr
}

const readBootFiles = (boot: string[] | undefined): string[] => {
  if (!boot) return []
  const bootFiles = fs.readdirSync('src/boot')
  const sameBoot = getSameItemFormArray(boot, bootFiles)
  const bootPaths = sameBoot.map(path => resolve(process.cwd(), 'src/boot', path))
  return bootPaths
}

const readCssFiles = (css: CssPaths): string[] => {
  const paths = files.map(filename => resolve(process.cwd(), dir, filename))
  return paths
}

export default async function styleInjectPlugin(options: Options) {
  const { css, boot } = options
  console.log('options-css--', css)
  console.log('options-boot--', boot)
  
  const bootPaths = readBootFiles(boot)
  const cssPaths = readCssFiles(css)
  const injectFiles = [...bootPaths, ...cssPaths]

  let pathImps:string = ''
  injectFiles.forEach(cssPath => {
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