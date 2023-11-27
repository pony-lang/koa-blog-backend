import { Context } from "koa"

/**
 * 成功回调函数
 * @param ctx 上下文对象
 * @param data 返回的数据
 * @param message 成功信息（可选，默认为"success"）
 * @param code 返回的状态码（可选，默认为200）
 */
function success(
	ctx: Context,
	data: any,
	message: string = "success",
	code: number = 200
) {
	ctx.body = {
		code,
		data,
		message,
	}
}

/**
 * 失败处理函数
 * @param ctx 上下文对象
 * @param message 错误信息，默认为 'error'
 * @param data 错误数据，默认为 null
 * @param code 错误码，默认为 500
 */
function fail(
	ctx: Context,
	message: string = "error",
	data: any = null,
	code: number = 500
) {
	ctx.body = {
		code,
		message,
		data,
	}
}
export { success, fail }
