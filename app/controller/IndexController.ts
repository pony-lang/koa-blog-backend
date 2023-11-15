/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:52
 * @LastEditors: bin
 * @LastEditTime: 2023-11-09 13:39:51
 * @objectDescription: 入口文件
 */
import { Context } from "koa";
import { UserModel } from '../db/model/ModelUser'

import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://root:admin@cluster0.lbntp0i.mongodb.net/')

function guid() {
    const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
    );
}
class IndexController {
    async getUserList(ctx: Context) {
        ctx.body = await UserModel.find({})
    }
    async createUser(ctx: Context) {
        UserModel.create({
            username: 'saf',
            password: '231',
            email: '12@qq.com',
            user_id: guid()
        })
        ctx.body = '成功'
    }
}

export default new IndexController