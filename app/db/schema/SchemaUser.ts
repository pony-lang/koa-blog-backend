/*
 * @Author: bin
 * @Date: 2023-11-08 16:35:16
 * @LastEditors: bin
 * @LastEditTime: 2023-12-11 14:25:34
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
	createdAt: {
		type: Number,
	},
	updatedAt: {
		type: Number,
	},
	user_type: {
		type: String,
		require: true,
	},
},{
	timestamps: {
		type: Number,
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})
export const UserModel = mongoose.model("User", UserSchema)
