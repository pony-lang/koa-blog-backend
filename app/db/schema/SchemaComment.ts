/*
 * @Author: bin
 * @Date: 2023-11-21 11:44:02
 * @LastEditors: bin
 * @LastEditTime: 2023-11-27 09:49:20
 * @objectDescription: 入口文件
 */
import mongoose, { Schema } from "mongoose"
export const CommentSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	article: {
		type: Schema.Types.ObjectId,
		ref: "Article",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})
export const CommentModel = mongoose.model("Comment", CommentSchema)
