/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:39
 * @LastEditors: bin
 * @LastEditTime: 2023-11-16 10:53:29
 * @objectDescription: 入口文件
 */
import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import router from './router'
import { Server } from 'http'
import bodyparser from 'koa-bodyparser'

import AccessLogMiddleWare from './middleware/AccessLogMiddleware'


const app = new Koa
app.use(bodyparser(
    { enableTypes: ['json', 'form', 'text'] }
))
app
    .use(AccessLogMiddleWare)
    .use(router.routes())

const run = (port: any): Server => {
    return app.listen(port)
}
export default run 