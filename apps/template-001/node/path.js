import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

export const getCurrentFile = () => fileURLToPath(import.meta.url)

export const getCurrentDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return __dirname
}
