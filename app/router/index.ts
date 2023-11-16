/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:59
 * @LastEditors: bin
 * @LastEditTime: 2023-11-15 11:21:53
 * @objectDescription: 入口文件
 */
/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:59
 * @LastEditors: bin
 * @LastEditTime: 2023-11-01 15:44:56
 * @objectDescription: 入口文件
 */
import koaRouter from 'koa-router'
import IndexController from '../controller/UserController/IndexController'
import LoginController from '../controller/LoginController/LoginController'
import AuthMiddleware from '../middleware/AuthMiddleware'
const router = new koaRouter({ prefix: '/admin' })

router.post('/login', LoginController.login)

router.use(AuthMiddleware)
router.get('/userList', IndexController.getUserList)
router.get('/createUser', IndexController.createUser)

export default router