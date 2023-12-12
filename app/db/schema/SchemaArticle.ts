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
	createdAt: {
		type: Number,
	},
	updatedAt: {
		type: Number,
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
},{
	timestamps: {
		type: Number,
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})
export const ArticleModel = mongoose.model("Article", ArticleSchema)
