import type { ChalkInstance } from 'chalk'
import path from 'node:path'
import process from 'node:process'
import chalk from 'chalk'
import fs from 'fs-extra'
import prompts from 'prompts'
import whichPMRuns from 'which-pm-runs'

import { isEmptyDir, isValidPackageName, pathFormat, toValidPackageName } from './utils'

const cwd = process.cwd()

interface Variant {
  name: string
  description: string
  path: string
  color: ChalkInstance
}

interface Options {
  projectName: string
  packageName: string
  variant?: string
}

const VARIANTS: Variant[] = [
  {
    name: 'JavaScript',
    description: 'Vite + JavaScript template',
    path: 'template-empty',
    color: chalk.yellow,
  },
  {
    name: 'TypeScript',
    description: 'Vite + TypeScript template',
    path: 'template-empty-ts',
    color: chalk.blue,
  },
]

async function init() {
  const options: Options = await prompts([
    {
      type: 'text',
      name: 'projectName',
      initial: 'qinglong-project',
      message: chalk.green('Project name:'),
      format: value => value.trim(),
      validate: name => name.trim() === ''
        ? 'Project name cannot be empty'
        : !fs.existsSync(name)
          || isEmptyDir(name)
          || `Target directory "${name}" is not empty`,
    },
    {
      type: 'text',
      name: 'packageName',
      initial: prev => toValidPackageName(prev),
      message: chalk.green('Package name:'),
      validate: name => isValidPackageName(name),
    },
    {
      type: 'select',
      name: 'variant',
      message: chalk.green('Select a template variant:'),
      choices: VARIANTS.map(variant => ({
        title: variant.color(variant.name),
        description: variant.description,
        value: variant.path,
      })),
    },
  ])

  if (options.variant === undefined) {
    return console.log(chalk.yellow('\n👋 Create project cancelled.'))
  }

  const root = path.resolve(cwd, options.projectName)
  const template = path.resolve(import.meta.dirname, '..', options.variant!)
  const pkg = path.join(root, 'package.json')

  fs.mkdirSync(root, { recursive: true })
  fs.copySync(template, root, { overwrite: false, errorOnExist: true })

  const pkgJson = fs.readJSONSync(pkg, { encoding: 'utf-8' })
  pkgJson.name = options.packageName
  delete pkgJson.private

  fs.writeJSONSync(pkg, pkgJson, { spaces: 2 })
  fs.renameSync(path.join(root, '_gitignore'), path.join(root, '.gitignore'))

  const pm = whichPMRuns()?.name ?? 'npm'
  const cd = path.relative(cwd, root)

  console.log(`\n  cd ${pathFormat(cd)}`)
  switch (pm) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn build')
      break
    default:
      console.log(`  ${pm} install`)
      console.log(`  ${pm} run build`)
      break
  }
  console.log(chalk.green(`\n🎉 Project "${options.packageName}" created successfully.`))
}

init().catch(console.error)
