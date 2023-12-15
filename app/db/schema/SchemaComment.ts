/*
 * @Author: bin
 * @Date: 2023-11-21 11:44:02
 * @LastEditors: bin
 * @LastEditTime: 2023-12-01 11:18:50
 * @objectDescription: 入口文件
 */
import mongoose, { Schema } from "mongoose"
export const CommentSchema = new Schema(
	{
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
			type: Number,
		},
		updatedAt: {
			type: Number,
		},
		status: {
			type: String,
			default: "1",
		},
	},
	{
		timestamps: {
			type: Number,
			currentTime: () => Math.floor(Date.now() / 1000),
		},
	}
)
export const CommentModel = mongoose.model("Comment", CommentSchema)
