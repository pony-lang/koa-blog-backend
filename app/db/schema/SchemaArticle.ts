import mongoose, { Schema } from "mongoose"
export const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	content: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
})
export const ArticleModel = mongoose.model("Article", ArticleSchema)
