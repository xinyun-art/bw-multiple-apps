import fs from 'fs'
import { minify } from 'terser'
import CleanCSS from 'clean-css'

export default async function styleInjectPlugin(params) {
  console.log('params--', params)

  const { site_code, site_env } = process.env
  console.log('site_code--',site_code)
  console.log('site_env--',site_env)
  console.log('params-SITE_THEME--',params.env.SITE_THEME)

  console.log('buildStart--')
  const m = fs.readFileSync(`./src/assets/styles/themes/theme-${params.env.SITE_THEME}/index.scss`, "utf8")
  // console.log('m--', m)
  const input = 'a{font-weight:bold;}';
  const options = { /* options */ };
  const mm = new CleanCSS(options).minify(input);
  console.log('mm--', mm)

  return {
    name: 'vite:markdown',

    enforce: 'pre',

    buildStart() {
    },

    transform(code, id, opt) {
      // console.log('code--', code)
      if (id.endsWith('main.ts')) {
        console.log('code--', code)
        return `${code}\nif (typeof window !== 'undefined') {
          const style = document.createElement('style');
          style.innerHTML = ${mm.styles};
          document.head.appendChild(style);
        }`
      }
      return code
      // if (id.endsWith('main.ts')) {
      //   console.log('code--', code)
      //   return `${code}\nif (typeof window !== 'undefined') {
      //     const style = document.createElement('style');
      //     style.innerHTML = 'html.theme-001 {--white11: #cccccc;--black11: #000000;};'
      //     document.head.appendChild(style);
      //   }`
      // }
      // return code
    }
  }
}