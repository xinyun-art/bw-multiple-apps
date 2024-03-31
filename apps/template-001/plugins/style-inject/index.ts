import fs from 'fs'
import path from 'path'
import { minify } from 'terser'
import CleanCSS from 'clean-css'

export default async function styleInjectPlugin(options) {
  console.log('options--', options)

  const { css } = options
  const paths = css.map(path => (`import '${path}';`)).join('')
  console.log('paths--', paths)

  console.log('buildStart--')
  // const output = fs.readFileSync(`./src/assets/styles/themes/theme-${params.env.SITE_THEME}/index.scss`, "utf8")
  // const cleanCss = new CleanCSS({}).minify(output);
  // const outputStr = JSON.stringify(cleanCss.styles)
  // console.log('outputStr--', outputStr)

  // const pa = path.join(__dirname, `../../src/assets/styles/themes/theme-${params.env.SITE_THEME}/index.scss`)
  return {
    name: 'vite:style-inject',

    enforce: 'pre',

    buildStart() {
    },

    transform(code, id, opt) {
      if (id.endsWith('main.ts')) {
        // console.log('code--', code)
        return `${paths};\n${code}`
      }
      // if (id.endsWith('main.ts')) {
      //   console.log('code--', code)
      //   return `if (typeof window !== 'undefined') {
      //     const style = document.createElement('style');
      //     style.setAttribute('type', 'text/css');
      //     style.innerHTML = ${outputStr};
      //     document.head.appendChild(style);
      //   }\n${code}`
      // }
      return code
    }
  }
}