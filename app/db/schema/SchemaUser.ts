/*
 * @Author: bin
 * @Date: 2023-11-08 16:35:16
 * @LastEditors: bin
 * @LastEditTime: 2023-11-27 09:49:41
 * @objectDescription: 入口文件
 */
import mongoose, { Schema } from "mongoose"
export const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true,
	},
	nickname: {
		type: String,
		unique: true,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	user_id: {
		type: String,
		require: true,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	user_type: {
		type: String,
		require: true,
	},
})
export const UserModel = mongoose.model("User", UserSchema)
