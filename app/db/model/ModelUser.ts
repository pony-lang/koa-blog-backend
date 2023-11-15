/*
 * @Author: bin
 * @Date: 2023-11-08 16:35:29
 * @LastEditors: bin
 * @LastEditTime: 2023-11-08 17:21:19
 * @objectDescription: 入口文件
 */
import mongoose from 'mongoose'
import { UserSchema } from '../schema/SchemaUser'
export const UserModel = mongoose.model('User', UserSchema)