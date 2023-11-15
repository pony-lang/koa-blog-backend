import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import router from './router'
import {Server} from 'http'
import AccessLogMiddleWare from './middleware/AccessLogMiddleware' 


const app = new Koa
app
    .use(AccessLogMiddleWare)
    .use(router.routes())
const run = (port: any):Server => {
    return app.listen(port)
}
export default run 