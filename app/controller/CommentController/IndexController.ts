import { Context } from "koa"
import { CommentModel } from "../../db/schema/SchemaComment"
import { paginate } from "../../utils/paginate"
import { fail, success } from "../../utils/response"
import type * as Comments from "./types/comments"
class CommentsController {
	async createComment(ctx: Context) {
		const requestBody = ctx.request["body"] as Comments.CreateComment
		const { content, userid, articleid } = requestBody
		if (!content || !userid || !articleid) {
			fail(ctx, "评论失败")
		}
		const CommentRes = CommentModel.create({
			content,
			user_id: userid,
			article_id: articleid,
		})
		if (!CommentRes) {
			fail(ctx, "评论失败")
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
			author = "",
		} = requestQuery
		const count = await CommentModel.find({
			content: {
				$regex: content,
			},
			status: {
				$regex: status,
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
		})
			.skip(offset - 1)
			.limit(limit)
			.exec()
		if (!commentsList) {
			fail(ctx, "获取评论失败", null, 500)
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
		}
		if (status != "1" && status != "2") {
			fail(ctx, "审核状态错误")
		}
		const CommentRes = await CommentModel.findByIdAndUpdate(id, {
			status,
			updateAt: new Date(),
		})
		if (!CommentRes) {
			fail(ctx, "更新评论失败")
		}
		success(ctx, [], "更新评论成功")
		return
	}
}
export default new CommentsController()
