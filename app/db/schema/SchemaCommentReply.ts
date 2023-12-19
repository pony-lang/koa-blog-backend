import mongoose, { Schema } from "mongoose"
export const CommentReplySchema = new Schema(
	{
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        reply_id: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        arcitle_id: {
            type: Schema.Types.ObjectId,
            ref: "Article",
        },
        status: {
			type: String,
			default: "1",
		},
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Number,
            required: true,
            default: Math.floor(Date.now() / 1000),
        },
        updatedAt: {
            type: Number,
            required: true,
            default: Math.floor(Date.now() / 1000),
        },
    },
	{
		timestamps: {
			type: Number,
			currentTime: () => Math.floor(Date.now() / 1000),
		},
	}
)
export const CommentReplyModel = mongoose.model("CommentsReplay", CommentReplySchema)
