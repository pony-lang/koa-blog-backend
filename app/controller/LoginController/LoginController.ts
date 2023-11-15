/*
 * @Author: bin
 * @Date: 2023-11-10 14:42:14
 * @LastEditors: bin
 * @LastEditTime: 2023-11-15 16:51:59
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
        const { username, password }: Login.LoginType = ctx.request.body as Login.LoginType
        console.log(username, password);
        const res = await UserModel.findOne({ username, password })
        if (!res) {
            fail(ctx, '用户不存在', null, 401)
            return
        }
        if (res?.password !== '231') {
            fail(ctx, '密码错误', null, 401)
            return
        }
        if (res?.username !== 'saf') {
            fail(ctx, '用户名错误', null, 401)
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