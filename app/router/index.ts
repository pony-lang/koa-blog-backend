/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:59
 * @LastEditors: bin
 * @LastEditTime: 2023-12-01 11:14:00
 * @objectDescription: 入口文件
 */
/*
 * @Author: bin
 * @Date: 2023-11-01 15:37:59
 * @LastEditors: bin
 * @LastEditTime: 2023-11-01 15:44:56
 * @objectDescription: 入口文件
 */
import koaRouter from "koa-router"
import IndexController from "../controller/UserController/IndexController"
import LoginController from "../controller/LoginController/LoginController"

import ArticleIndexController from "../controller/ArticleController/IndexController"
import TagController from "../controller/TagController/IndexController"
import CommentController from "../controller/CommentController/IndexController"
import AuthMiddleware from "../middleware/AuthMiddleware"
const router = new koaRouter({ prefix: "/admin" })

// 登录模块
router.post("/login", LoginController.login)
router.get("/captcha", LoginController.captcha)
router.use(AuthMiddleware)

// 用户模块
router.get("/userList", IndexController.getUserList)
router.post("/createUser", IndexController.createUser)
router.get("/getUserInfo", IndexController.getUserInfo)

// 文章模块
router.post("/createArticle", ArticleIndexController.createArticle)
router.get("/getArticle", ArticleIndexController.getArticleList)
router.post("/updateArticle", ArticleIndexController.updateArticle)
router.post("/deleteArticle", ArticleIndexController.deleteArticle)
router.get("/detailArticle", ArticleIndexController.detailArticle)

// 分类模块
router.get("/getTags", TagController.getTagsList)
router.post("/createTag", TagController.createTag)
router.post("/deleteTag", TagController.deleteTag)
router.post("/updateTag", TagController.updateTag)

// 评论模块
router.post("/createComment", CommentController.createComment)
router.get("/getCommentList", CommentController.getCommentList)
router.post("/updatedComment", CommentController.updatedComment)
export default router
