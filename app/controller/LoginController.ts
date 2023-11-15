/*
 * @Author: bin
 * @Date: 2023-11-10 14:42:14
 * @LastEditors: bin
 * @LastEditTime: 2023-11-10 16:40:23
 * @objectDescription: 入口文件
 */
import { Context } from 'koa';
import { UserModel } from '../db/model/ModelUser'
import { sign } from '../utils/jwtToken'
class LoginController {
    async login(ctx: Context) {
        const res = await UserModel.findOne({ username: 'saf', password: '231' })
        const token = sign({ username: res?.username })
        ctx.body = {
            accesstoken: token,
            username: res?.username,
            userid: res?.user_id
        }
    }
}
export default new LoginController