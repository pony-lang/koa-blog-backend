/*
 * @Author: bin
 * @Date: 2023-11-08 09:37:59
 * @LastEditors: bin
 * @LastEditTime: 2023-11-15 09:43:43
 * @objectDescription: 入口文件
 */
import { Context, Next } from "koa"
import { Accesslogger } from "../logger"
/**
 * 访问日志中间件
 * @param ctx 上下文对象
 * @param next 下一个中间件函数
 */
function AccessLogMiddleWare(ctx: Context, next: Next) {
	const logStr = `path:${ctx.path} | method: ${ctx.method}`
	Accesslogger.info(logStr)
	return next()
}
export default AccessLogMiddleWare
