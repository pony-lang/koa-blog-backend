/*
 * @Author: bin
 * @Date: 2023-11-21 11:31:17
 * @LastEditors: bin
 * @LastEditTime: 2023-11-23 17:19:58
 * @objectDescription: 入口文件
 */
import { Context } from "koa"
import { fail, success } from "../../utils/response"
import { ArticleModel } from "../../db/schema/SchemaArticle"
import { TagModel } from "../../db/schema/SchemaTag"
import type * as Article from "./types/article"
import { guid } from "../../utils/guid"
import { paginate } from "../../utils/paginate"
class ArticleIndexController {
	async createArticle(ctx: Context) {
		const requestBody = ctx.request["body"] as Article.ArticleType
		const { title, content, author, tags } = requestBody
		if (!title || !content || !author || !tags) {
			fail(ctx, "请求参数错误", null, 400)
			return
		}
		const existingTags = await TagModel.find({
			tag_name: {
				$in: tags,
			},
		}).exec()
		// 已存在的标签
		const existingTagIds = existingTags.map(tag => tag._id.toString())
		// 不存在的标签
		const existingTagNames = existingTags.map(tag => tag.tag_name.toString())
		const noTag = tags.filter(tag => !existingTagNames.includes(tag))
		noTag.forEach(async tag => {
			let newTagRes = await TagModel.create({
				tag_name: tag,
			})
			existingTagIds.push(newTagRes._id.toString())
		})
		const articleRes = await ArticleModel.create({
			title,
			content,
			author,
			tags: existingTagIds,
		})
		if (articleRes) {
			success(ctx, [], "创建成功", 200)
		} else {
			fail(ctx, "创建失败", null, 500)
		}
	}
	async getArticleList(ctx: Context) {
		const requestBody = ctx.request[
			"query"
		] as unknown as Article.ArticleListType
		const { offset, limit, title = "", tags = "" } = requestBody
		const count = await ArticleModel.find({
			title: {
				$regex: title,
			},
		}).countDocuments()
		const { total, totalPage, pageSize, current_page } = paginate(
			count,
			limit,
			offset
		)
		const articleList = await ArticleModel.find({
			title: {
				$regex: title,
			},
		})
			.populate({
				path: "tags",
				select: {
					tag_name: 1,
					_id: 0,
				},
			})
			.populate({
				path: "author",
				select: {
					username: 1,
					_id: 0,
				},
			})
			.skip(offset - 1)
			.limit(limit)
			.exec()
		if (!articleList) {
			fail(ctx, "查询失败", null, 500)
		}
		success(ctx, {
			data: articleList,
			total,
			totalPage,
			pageSize,
			current_page,
		})
	}
}
export default new ArticleIndexController()
