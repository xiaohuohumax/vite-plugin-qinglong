import fs from 'fs-extra'

export function isEmptyDir(dir: string): boolean {
  const files = fs.readdirSync(dir)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function isValidPackageName(name: string): boolean {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(name)
}

export function toValidPackageName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

export function pathFormat(path: string): string {
  return path.trim().replace(/\\/g, '/').replace(/\/$/g, '')
}
