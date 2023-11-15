/*
 * @Author: bin
 * @Date: 2023-11-08 09:37:59
 * @LastEditors: bin
 * @LastEditTime: 2023-11-10 11:19:14
 * @objectDescription: 入口文件
 */
import { Context, Next } from 'koa'
import { Accesslogger } from '../logger'
function AccessLogMiddleWare(ctx: Context, next: Next) {
    const logStr = `path:${ctx.path} | method: ${ctx.method}`
    Accesslogger.info(logStr)
    return next()
}
export default AccessLogMiddleWare