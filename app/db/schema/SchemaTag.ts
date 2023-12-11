import mongoose, { Schema } from "mongoose"
export const SchemaTag = new mongoose.Schema({
	tag_name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
},{
	timestamps: {
		type: Number,
		currentTime: () => Math.floor(Date.now() / 1000)
	}
})
export const TagModel = mongoose.model("Tag", SchemaTag)
