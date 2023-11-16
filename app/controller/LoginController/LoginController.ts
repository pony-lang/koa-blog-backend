/*
 * @Author: bin
 * @Date: 2023-11-10 14:42:14
 * @LastEditors: bin
 * @LastEditTime: 2023-11-16 10:49:08
 * @objectDescription: 入口文件
 */
import { Context } from 'koa';
import { UserModel } from '../../db/model/ModelUser'
import { sign } from '../../utils/jwtToken'
import { success, fail } from '../../utils/response'
import type * as Login from './types/login'
/**
 * 登录控制器类
 */
class LoginController {
    async login(ctx: Context) {
        const requestBody = ctx.request.body as unknown as Login.LoginType
        const { username, password } = requestBody
        const res = await UserModel.findOne({ username, password})
        if (!res) {
            fail(ctx, '用户名或密码错误', null, 401)
            return
        }
        const token = sign({ username: res?.username })
        success(ctx, {
            accesstoken: token,
            username: res?.username,
            userid: res?.user_id
        })
    }
}
export default new LoginController