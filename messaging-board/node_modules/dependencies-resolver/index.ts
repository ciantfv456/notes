import {
  existsSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'fs'
import { join, resolve } from 'path'
import { execSync } from 'child_process'
import fetch from 'cross-fetch'
import konan = require('konan')
const url = 'https://nodejs.org/docs/latest/api/documentation.json'

export interface dependencyJson {
  [packageName: string]: string
}

/**
 * 从文件或文件夹中递归获取依赖
 * @param {string} filePath 需要遍历的文件路径
 * @param {string[]} extend 搜索的拓展名
 * @returns {string[]} fileList 文件列表
 */
export function getDepends(path: string, extend: string[]): string[] {
  const fileList = []
  const depends = []
  function findFile(path: string) {
    const files = readdirSync(path)
    files.forEach((item) => {
      const fPath = join(path, item)
      const stat = statSync(fPath)
      if (stat.isDirectory() === true && item !== 'node_modules') {
        findFile(fPath)
      }
      const newExtend = extend.map((ext) => item.endsWith('.' + ext))
      if (stat.isFile() === true && newExtend.includes(true)) {
        fileList.push(fPath)
      }
    })
  }
  findFile(path)
  fileList.forEach((item) => {
    depends.push(...konan(readFileSync(item, 'utf-8')).strings)
  })
  return Array.from(new Set(depends))
}

/**
 * Search dependencies and install
 * @param {string} path search path
 * @param {Object<string,string>} attach attach dependencies
 * @param {string} npmClient package install client
 * @param {string[]} excludeOption options excluded from package.json
 * @param {string[]} extend filter suffix of searching files
 * @param {boolean} silent silent info
 * @return {Promise<dependencyJson>} <dependencies,version> installed
 */
const requireResolver = async (
  path: string,
  attach: dependencyJson = {},
  npmClient: string = 'npm',
  excludeOption: string[] = ['dependencies', 'devDependencies', 'scripts'],
  extend: string[] = ['js', 'mjs', 'cjs', 'ts', 'jsx'],
  silent: boolean = false
): Promise<dependencyJson> => {
  const pprint = (...content: any[]) => {
    if (!silent) console.log('[ dependencies-resolver ] ', ...content)
  }
  const dependencyJson: dependencyJson = {}
  pprint('Fetch built-in modules list from npm...')
  const content = await (await fetch(url)).json()
  const table = content.miscs[0].miscs.filter(
    (item: { name: string }) => item.name === 'stability_overview'
  )[0].desc
  const internelModules = table
    .match(/<a href=(.*?)>/g)
    .map((item: string | any[]) => item.slice(9, -7))
  pprint('Resolving dependencies...')
  const toinstall = getDepends(path, extend)
    .filter((item) => !(item.startsWith('./') || item.startsWith('../')))
    .filter((item) => !internelModules.includes(item))
  const pkgJsonPath = resolve(path, 'package.json')
  let pkgJson = {}
  let pkgDependencies = {}
  if (existsSync(pkgJsonPath)) {
    pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
    if (pkgJson['dependencies']) {
      pkgDependencies = pkgJson['dependencies']
    }
    excludeOption.forEach((item) => {
      if (pkgJson[item]) {
        delete pkgJson[item]
      }
    })
  }
  toinstall.forEach((dependency) => {
    let version = '*'
    if (Object.keys(pkgDependencies).includes(dependency)) {
      version = pkgDependencies[dependency]
    }
    dependencyJson[dependency] = version
  })
  Object.keys(attach).forEach((dependency) => {
    dependencyJson[dependency] = attach[dependency]
  })
  pkgJson['dependencies'] = dependencyJson
  pprint(
    'Find dependencies: ',
    JSON.stringify(dependencyJson, null, 2).replace('{', '').replace('}', '')
  )
  writeFileSync(pkgJsonPath, JSON.stringify(pkgJson))
  const currentPath = resolve()
  process.chdir(path)
  pprint('Installing dependencies...')
  pprint(execSync(`${npmClient} install`).toString('utf-8'))
  pprint('Deduping dependencies...')
  pprint(execSync(`${npmClient} dedupe --production`).toString('utf-8'))
  process.chdir(currentPath)
  return dependencyJson
}

export default requireResolver
