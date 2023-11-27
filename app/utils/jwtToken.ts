/*
 * @Author: bin
 * @Date: 2023-11-10 11:46:03
 * @LastEditors: bin
 * @LastEditTime: 2023-11-15 09:44:04
 * @objectDescription: 入口文件
 */
import jwt from "jsonwebtoken"
import config from "../config"

/**
 * 生成JWT签名
 * @param data JWT的内容
 * @returns JWT的签名
 */
function sign(data: any) {
	return jwt.sign({ data }, config.jwt.secretKey as string, {
		expiresIn: config.jwt.expire,
	})
}

/**
 * 验证令牌是否有效
 * @param token 令牌字符串
 * @returns 包含验证结果的对象
 */
function verify(token: string) {
	try {
		const decoded = jwt.verify(token, config.jwt.secretKey as string)
		return {
			admin: decoded,
			error: null,
		}
	} catch (err) {
		// 错误信息
		return {
			admin: null,
			error: err,
		}
	}
}

export { sign, verify }
