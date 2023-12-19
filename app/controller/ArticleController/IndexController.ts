/*
 * @Author: bin
 * @Date: 2023-11-21 11:31:17
 * @LastEditors: bin
 * @LastEditTime: 2023-12-19 20:55:59
 * @objectDescription: 入口文件
 */
import { Context } from "koa"
import { fail, success } from "../../utils/response"
import { ArticleModel } from "../../db/schema/SchemaArticle"
import { TagModel } from "../../db/schema/SchemaTag"
import { CommentModel } from "../../db/schema/SchemaComment"
import { CommentReplyModel } from "../../db/schema/SchemaCommentReply"

import type * as Article from "./types/article"
import { guid } from "../../utils/guid"
import { paginate } from "../../utils/paginate"
import mongoose from "mongoose"
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
			return
		}
		success(ctx, {
			data: articleList,
			total,
			totalPage,
			pageSize,
			current_page,
		})
	}
	async updateArticle(ctx: Context) {
		const requestBody = ctx.request["body"] as Article.updateType
		const { title, content, userid, tags, id } = requestBody
		if (!id || !userid || !title || !content || !tags) {
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
		for (let i = 0; i < noTag.length; i++) {
			let newTagRes = await TagModel.create({
				tag_name: noTag[i],
			})
			existingTagIds.push(newTagRes._id.toString())
		}
		const articleRes = await ArticleModel.updateOne(
			{
				_id: id,
			},
			{
				title,
				content,
				author: userid,
				tags: existingTagIds,
				// updateAt: new Date(),
			}
		)

		if (articleRes) {
			success(ctx, [], "更新成功", 200)
		} else {
			fail(ctx, "更新失败", null, 500)
		}
	}
	async detailArticle(ctx: Context) {
		const requestBody = ctx.request[
			"query"
		] as unknown as Article.ArticleDetailType
		const { id } = requestBody
		if (!id) {
			fail(ctx, "请求参数错误", null, 400)
			return
		}
		const articleRes = await ArticleModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "author",
					foreignField: "_id",
					as: "author",
				},
			},
			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "category",
				},
			},
			{
				$lookup: {
					from: "comments",
					localField: "_id",
					foreignField: "article_id",
					as: "comments",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "comments.user_id",
					foreignField: "_id",
					as: "commentsAuthor",
				},
			},
			{
				$project: {
					_id: 1,
					title: 1,
					content: 1,
					tags: {
						$map: {
							input: "$category",
							as: "category",
							in: {
								tagName: "$$category.tag_name",
								tagId: "$$category._id",
							},
						},
					},
					author: {
						username: {
							$arrayElemAt: [
								"$author.username",
								0,
							],
						},
						nickname: {
							$arrayElemAt: [
								"$author.nickname",
								0,
							],
						},
						userid: {
							$arrayElemAt: [
								"$author._id",
								0,
							],
						},
					},
					comments: {
						$map: {
							input: "$comments",
							as: "comment",
							in: {
								content: "$$comment.content",
								commentId: "$$comment._id",
								commentsAuthor: {
									commentUserName: {
										$arrayElemAt: [
											"$commentsAuthor.username",
											0,
										],
									},
									commentUserid: {
										$arrayElemAt: [
											"$commentsAuthor._id",
											0,
										],
									},
									commentNickname: {
										$arrayElemAt: [
											"$commentsAuthor.nickname",
											0,
										],
									},
								},
							},
						},
					},
				},
			},
		])
		if (!articleRes) {
			fail(ctx, "查询失败", null, 500)
			return
		}
		success(ctx, { data: articleRes })
	}
	async deleteArticle(ctx: Context) {
		const requestBody = ctx.request[
			"body"
		] as unknown as Article.ArticleDetailType
		const { id } = requestBody
		if (!id) {
			fail(ctx, "请求参数错误", null, 400)
			return
		}
		const commentRes = await CommentModel.deleteMany({
			article_id: id,
		})
		const commentReplyRes = await CommentReplyModel.deleteMany({
			article_id: id,
		})
		const articleRes = await ArticleModel.deleteOne({
			_id: id,
		})
		if (articleRes && commentRes) {
			success(ctx, [], "删除成功", 200)
		} else {
			fail(ctx, "删除失败", null, 500)
		}
	}
}
export default new ArticleIndexController()
