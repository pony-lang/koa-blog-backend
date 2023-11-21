/*
 * @Author: bin
 * @Date: 2023-11-21 11:54:35
 * @LastEditors: bin
 * @LastEditTime: 2023-11-21 11:56:07
 * @objectDescription: 入口文件
 */
import mongoose, { Schema } from 'mongoose'
export const ArticleTagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
})
export const ArticleTagModel = mongoose.model('ArticleTag', ArticleTagSchema)