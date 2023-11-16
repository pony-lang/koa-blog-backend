/*
 * @Author: bin
 * @Date: 2023-11-08 16:35:16
 * @LastEditors: bin
 * @LastEditTime: 2023-11-16 14:11:25
 * @objectDescription: 入口文件
 */
import { Schema } from 'mongoose'
export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user_type: {
        type: String,
        require: true
    },
})