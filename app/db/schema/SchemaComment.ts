import mongoose, { Schema } from 'mongoose'
export const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export const CommentModel = mongoose.model('Comment', CommentSchema)
