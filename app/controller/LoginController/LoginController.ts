/*
 * @Author: bin
 * @Date: 2023-11-10 14:42:14
 * @LastEditors: bin
 * @LastEditTime: 2023-11-21 14:07:44
 * @objectDescription: 登录文件
 */
import { Context, Request } from 'koa';
import { UserModel } from '../../db/schema/SchemaUser'
import { sign } from '../../utils/jwtToken'
import { success, fail } from '../../utils/response'
import svgCaptcha from 'svg-captcha'
import type * as Login from './types/login'
// import { Rules } from 'async-validator'
// import validate from '../../utils/validate'
/**
 * 登录控制器类
 */
class LoginController {
    async login(ctx: Context) {
        const requestBody = ctx.request['body'] as Login.LoginType
        const { username, password } = requestBody
        const res = await UserModel.findOne({ username, password })
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
    async captcha(ctx: Context) {
        const captcha = svgCaptcha.create({
            size: 4,
            width: 160,
            height: 60,
            fontSize: 50,
            ignoreChars: '0oO1ilI',
            noise: 4,
            color: true,
            background: '#cc9966'
        })
        let img = captcha.data // 验证码
        let text = captcha.text.toLowerCase()
        ctx.type = 'html'
        ctx.body = `${img}<br><a href="javascript: window.location.reload();">${text}</a>`
    }
}
export default new LoginController