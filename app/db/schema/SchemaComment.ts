/*
 * @Author: bin
 * @Date: 2023-11-21 11:44:02
 * @LastEditors: bin
 * @LastEditTime: 2023-12-01 11:18:50
 * @objectDescription: 入口文件
 */
import mongoose, { Schema } from "mongoose"
export const CommentSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	article_id: {
		type: Schema.Types.ObjectId,
		ref: "Article",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		default: "1",
	},
})
export const CommentModel = mongoose.model("Comment", CommentSchema)
