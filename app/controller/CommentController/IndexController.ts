/*
 * @Author: bin
 * @Date: 2023-11-29 10:16:14
 * @LastEditors: bin
 * @LastEditTime: 2023-12-19 21:30:20
 * @objectDescription: 入口文件
 */
import { Context } from "koa"
import { CommentModel } from "../../db/schema/SchemaComment"
import { CommentReplyModel } from "../../db/schema/SchemaCommentReply"
import { ArticleModel } from "../../db/schema/SchemaArticle"
import { UserModel } from "../../db/schema/SchemaUser"
import { paginate } from "../../utils/paginate"
import { fail, success } from "../../utils/response"
import type * as Comments from "./types/comments"
class CommentsController {
	async createComment(ctx: Context) {
		const requestBody = ctx.request["body"] as Comments.CreateComment
		const { content, userid, articleid } = requestBody
		if (!content || !userid || !articleid) {
			fail(ctx, "评论失败")
			return
		}
		const CommentRes = CommentModel.create({
			content,
			user_id: userid,
			article_id: articleid,
		})
		if (!CommentRes) {
			fail(ctx, "评论失败")
			return
		}
		success(ctx, [], "评论成功")
		return
	}
	async getCommentList(ctx: Context) {
		const requestQuery = ctx.request[
			"query"
		] as unknown as Comments.CommenstList
		const {
			offset,
			limit,
			status = "",
			content = "",
			title = "",
			commentUserName = "",
		} = requestQuery
		const articleRes = await ArticleModel.find({
			title: {
				$regex: title,
			},
		})
		const userRes = await UserModel.find({
			username: {
				$regex: commentUserName,
			},
		})
		const count = await CommentModel.find({
			content: {
				$regex: content,
			},
			status: {
				$regex: status,
			},
			article_id: {
				$in: articleRes.map(item => item._id),
			},
			user_id: {
				$in: userRes.map(item => item._id),
			},
		}).countDocuments()
		const { total, totalPage, pageSize, current_page } = paginate(
			count,
			limit,
			offset
		)
		const commentsList = await CommentModel.find({
			content: {
				$regex: content,
			},
			status: {
				$regex: status,
			},
			article_id: {
				$in: articleRes.map(item => item._id),
			},
			user_id: {
				$in: userRes.map(item => item._id),
			},
		})
			.populate("user_id", "username nickname -_id")
			.populate("article_id", "title -_id")
			.skip(offset - 1)
			.limit(limit)
			.exec()
		if (!commentsList) {
			fail(ctx, "获取评论失败", null, 500)
			return
		}
		success(ctx, {
			data: commentsList,
			total,
			totalPage,
			pageSize,
			current_page,
		})
		return
	}
	async updatedComment(ctx: Context) {
		const requestBody = ctx.request["body"] as Comments.UpdateComment
		const { id, status } = requestBody
		if (!id || !status) {
			fail(ctx, "请求参数错误")
			return
		}
		if (status != "1" && status != "2") {
			fail(ctx, "审核状态错误")
			return
		}
		const CommentRes = await CommentModel.findByIdAndUpdate(id, {
			status,
		})
		if (!CommentRes) {
			fail(ctx, "更新评论失败")
			return
		}
		success(ctx, [], "更新评论成功")
		return
	}
	async deleteComment(ctx: Context) {
		const requestBody = ctx.request["body"] as Comments.DeleteComment
		const { id } = requestBody
		if (!id) {
			fail(ctx, "请求参数错误")
			return
		}
		const CommentRes = await CommentModel.findByIdAndDelete({_id: id})
		if (!CommentRes) {
			fail(ctx, "删除评论失败")
			return
		}
		success(ctx, [], "删除评论成功")
		return
	}
	async replyComment(ctx: Context) {
		const requestBody = ctx.request["body"] as Comments.ReplyComment
		const { content, userid, replyCommentId } = requestBody
		if (!content ||!userid ||!replyCommentId ) {
			return fail(ctx, "参数错误")
		}
		const ReplyCommentRes = CommentReplyModel.create({
			content,
			user_id: userid,
			reply_id: replyCommentId,
		})
		if (!ReplyCommentRes) {
			return fail(ctx, "回复失败")
		}
		success(ctx, [], "回复成功")
		return
	}
}
export default new CommentsController()
