/**
 * 生成随机字符串
 */
export class RandomString {
  static _seed = 0
  random() {
    return `${Math.random().toString(36).substring(2, 10)}${RandomString._seed++}`
  }
}

const randomString = new RandomString()

/**
 * 生成供给DOM用作ID的方法,相比于uuidv4执行会比较快
 */
export const generateDOMId = () => randomString.random()

/**
 * 格式化金钱
 * @param {string||number} num 数字字符串
 */
export const thousandNum = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * 生成随机HEX颜色值
 */
export const randomColor = () => `#${~~(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
