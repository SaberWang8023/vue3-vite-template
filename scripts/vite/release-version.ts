import dayjs from 'dayjs'
import { writeFile } from 'node:fs'
import { join } from 'node:path'
import { promisify } from 'node:util'

const promisifyWritefile = promisify(writeFile)

export const generateVersion = () => {
  const currentTime = dayjs().format('YYYYMMDD.HHmmss')
  const newVersion = `V1.${currentTime}`

  // 这里异步不await，是因为这是一个单纯的写入文本，其实并没啥卵用的玩意儿，为了跟其他几个运营支撑子应用的行为一致罢了
  promisifyWritefile(join(process.cwd(), 'version'), newVersion)
    .then(() => {
      console.log('【release-version】: 版本已更新! ')
    })
    .catch((err) => {
      console.log(`(╯°Д°)╯︵ ┻━┻【release-version】：`, err)
    })

  return newVersion
}
