/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:52
 * @LastEditors: bin
 * @LastEditTime: 2023-11-27 09:49:02
 * @objectDescription: 入口文件
 */
import { Context } from "koa"
import { UserModel } from "../../db/schema/SchemaUser"
import { guid } from "../../utils/guid"
import { paginate } from "../../utils/paginate"
import { fail, success } from "../../utils/response"
import * as User from "./types/user"

import mongoose from "mongoose"
mongoose.connect("mongodb+srv://root:admin@cluster0.lbntp0i.mongodb.net/")

class IndexController {
	async getUserList(ctx: Context) {
		const requestBody = ctx.request.query as unknown as User.UserListType
		const { offset, limit, username = "", email = "" } = requestBody
		const count = await UserModel.find({
			username: {
				$regex: username,
			},
			email: {
				$regex: email,
			},
		}).countDocuments()
		const { total, totalPage, pageSize, current_page } = paginate(
			count,
			limit,
			offset
		)
		const res = await UserModel.find({
			username: {
				$regex: username,
			},
			email: {
				$regex: email,
			},
		})
			.skip(offset - 1)
			.limit(limit)
		if (!res) {
			fail(ctx, "查询失败", null, 401)
			return
		}
		success(ctx, {
			data: res,
			total,
			totalPage,
			pageSize,
			current_page,
		})
	}
	async createUser(ctx: Context) {
		const requestBody = ctx.request["body"] as User.UserType
		const { username, password, email, nickname } = requestBody
		if (
			!username ||
			!password ||
			!email ||
			!nickname ||
			!requestBody.usertype
		) {
			fail(ctx, "请求参数错误", null, 400)
			return
		}
		const resUser = await UserModel.findOne({
			username,
		})
		if (resUser) {
			fail(ctx, "用户名已存在", null, 400)
			return
		}
		const res = await UserModel.create({
			username,
			nickname,
			password,
			email,
			user_id: guid(),
		})
		if (!res) {
			fail(ctx, "创建失败", null, 401)
			return
		}
		success(ctx, [])
	}
}

export default new IndexController()
