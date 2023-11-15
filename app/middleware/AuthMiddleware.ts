/*
 * @Author: bin
 * @Date: 2023-11-10 16:43:30
 * @LastEditors: bin
 * @LastEditTime: 2023-11-15 10:01:10
 * @objectDescription: 入口文件
 */
import { Context, Next } from "koa";
import { verify } from "../utils/jwtToken";
/**
 * 身份验证中间件
 * 
 * @param {Context} ctx - 上下文对象
 * @param {Next} next - 下一个中间件函数
 */
function AuthMiddleware(ctx: Context, next: Next) {
    const token = ctx.header.authorization; // 获取请求头中的authorization字段

    if (token) {
        const { error } = verify(token); // 验证token
        if (error != null && error != undefined) {
            ctx.body = {
                msg: (error as any).message, // 返回错误消息
                code: -1
            };
            return;
        }
        return next(); // 通过验证，继续执行下一个中间件函数
    }

    return ctx.body = {
        msg: 'token不可为空', // token不能为空
        code: 4000
    };
}

export default AuthMiddleware