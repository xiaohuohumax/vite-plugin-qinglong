import type { Options } from './types'

import { readPackage } from 'read-pkg'

export function options2banner(options: Options): string {
  const { name, version, description, author } = options

  const lines = [
    `${name} v${version || '0.0.1'}${author ? ` Copyright (c) ${author}` : ''}`,
    '',
    description ? description.split('\n') : null,
  ]
    .flat()
    .filter(line => line !== null)
    .map(line => line.trim())
    .map(line => ` *${line === '' ? '' : ` ${line}`}`)
    .join('\n')

  return `/**\n${lines}\n */`
}

export async function getPackageDependencies(): Promise<string[]> {
  const pkg = await readPackage()
  return Object.entries(pkg.dependencies || {})
    .map(([name, version]) => `${name}@${version}`)
}

export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
