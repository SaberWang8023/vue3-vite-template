/* eslint-disable @typescript-eslint/ban-ts-comment */

// import { readdir, lstat } from 'node:fs/promises'

// /**
//  * 深度优先查找并返回指定路径下的所有目录
//  * @param {string} path 目录路径
//  * @returns {Promise<string[]>} 目录下的所有目录
//  */
// export async function getFolder(path) {
//   const stack = []
//   const components = []
//   stack.push(path)

//   while (stack.length > 0) {
//     const currentPath = stack.pop()
//     const files = await readdir(currentPath)

//     for (const item of files) {
//       const fullPath = `${currentPath}/${item}`
//       const stat = await lstat(fullPath)

//       if (stat.isDirectory() && item !== 'components') {
//         components.push(fullPath)
//         stack.push(fullPath)
//       }
//     }
//   }

//   return components
// }

import { readdirSync, lstatSync } from 'node:fs'

/**
 * 深度优先查找并返回指定路径下的所有目录
 * @param {string} path 目录路径
 * @param {boolean} deep 是否深度遍历
 * @returns {string[]} 目录下的所有目录或者一级目录
 */
export function getFolder(path, deep = true) {
  const stack = []
  const components = []
  stack.push(path)

  while (stack.length > 0) {
    const currentPath = stack.pop()
    // @ts-expect-error
    const files = readdirSync(currentPath)

    files.forEach((item) => {
      const fullPath = `${currentPath}/${item}`
      const stat = lstatSync(fullPath)

      if (stat.isDirectory() && item !== 'components') {
        components.push(fullPath)
        if (deep) {
          stack.push(fullPath)
        }
      }
    })
  }

  return components
}

/**
 * 校验输入合规性
 * @param {string} errMsg 错误提示信息
 * @returns {(v: string|undefined) => boolean | string} 验证函数
 */
export function validate(errMsg) {
  return (v) => {
    // @ts-expect-error
    if (v && v.trim !== '') {
      return true
    }
    return errMsg
  }
}

export const VIEW_BASE = 'src/views'
