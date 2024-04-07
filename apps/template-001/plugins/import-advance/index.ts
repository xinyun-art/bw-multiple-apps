import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

export const getCurrentFile = () => fileURLToPath(import.meta.url)

export const getCurrentDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return __dirname
}

type CssPaths = (CssPath | string)[]
type Boot = boolean | string[]

interface Options {
  css: CssPaths,
  boot?: Boot
}
interface CssPath {
  dynamicImport?: boolean
  url: string
}

const getSameItemFormArray = <T>(arr1: T[], arr2: T[]): T[] => {
  const sameArr: T[] = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j] && !sameArr.includes(arr1[i])) {
        sameArr.push(arr1[i])
      }
    }
  }
  return sameArr
}

const readBootFiles = (boot: Boot | undefined): string[] => {
  if (!boot) return []
  const bootDir = resolve(process.cwd(), 'src/boot')
  let bootPaths: string[] = []
  if (typeof boot === 'boolean') {
    const bootFiles = fs.readdirSync(bootDir)
    bootPaths = bootFiles.map(path => resolve(bootDir, path))
  } else if (Array.isArray(boot)) {
    const bootFiles = fs.readdirSync(bootDir).map(item => item.split('.')[0])
    const sameBoot = getSameItemFormArray(boot, bootFiles)
    bootPaths = sameBoot.map(path => resolve(bootDir, path))
  }
  return bootPaths
}

export default async function styleInjectPlugin(options: Options) {
  const { css, boot } = options
  console.log('options-css--', css)
  console.log('options-boot--', boot)
  
  const bootPaths = readBootFiles(boot)
  console.log('bootPaths--', bootPaths)

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
  bootPaths.forEach(path => {
    pathImps += `import '${path}';`
  })
  console.log('pathImps--', pathImps)

  return {
    name: 'vite:import-advance',

    enforce: 'pre',

    buildStart() {
      console.log('buildStart--')
    },

    transform(code: any, id: any, opt: any) {
      if (id.endsWith('main.ts')) {
        console.log('mian.ts-id--', id)
        return `${pathImps};\n${code}`
      }
      return code
    }
  }
}