import mongoose, { Schema } from "mongoose"
export const SchemaTag = new mongoose.Schema({
	tag_name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	updateAt: {
		type: Date,
		default: Date.now(),
	},
})
export const TagModel = mongoose.model("Tag", SchemaTag)
