import { Context } from "koa"
import { TagModel } from "../../db/schema/SchemaTag"
import type * as Tag from "./types/index"
import { paginate } from "../../utils/paginate"
import { fail, success } from "../../utils/response"
class TagController {
	async getTagsList(ctx: Context) {
		const requestBody = ctx.request["query"] as unknown as Tag.TagListType
		const { offset, limit, tagName = "" } = requestBody
		const count = await TagModel.find({
			tag_name: {
				$regex: tagName,
			},
		}).countDocuments()
		const { total, totalPage, pageSize, current_page } = paginate(
			count,
			limit,
			offset
		)

		const tagsList = await TagModel.find({
			tag_name: {
				$regex: tagName,
			},
		})
			.skip(offset - 1)
			.limit(limit)
			.exec()
		if (!tagsList) {
			fail(ctx, "查询失败", null, 500)
			return
		}
		success(ctx, {
			data: tagsList,
			total,
			totalPage,
			pageSize,
			current_page,
		})
	}
	async createTag(ctx: Context) {
		const requestBody = ctx.request["body"] as unknown as Tag.CreateType
		const { tagName } = requestBody
		if (!tagName) {
			fail(ctx, "标签名称不能为空", null, 500)
			return
		}
		const tag = await TagModel.findOne({
			tag_name: tagName,
		})
		if (tag) {
			fail(ctx, "标签已存在", null, 500)
			return
		}
		const newTag = TagModel.create({
			tag_name: tagName,
		})
		if (!newTag) {
			fail(ctx, "创建失败", null, 500)
			return
		}
		success(ctx, {
			data: [],
		})
	}
	async deleteTag(ctx: Context) {
		const requestBody = ctx.request["body"] as unknown as Tag.DelOneType
		const { id } = requestBody
		if (!id) {
			fail(ctx, "请求参数错误", null, 500)
			return
		}
		const tag = await TagModel.findOne({
			_id: id,
		})
		if (!tag) {
			fail(ctx, "标签不存在", null, 500)
			return 
		}
		const deleteTag = await TagModel.deleteOne({
			_id: id,
		})
		if (!deleteTag) {
			fail(ctx, "删除失败", null, 500)
			return
		}
		success(ctx, {
			data: [],
		})
	}
	async updateTag(ctx: Context) {
		const requestBody = ctx.request["body"] as unknown as Tag.updateOneType
		const { id, tagName } = requestBody
		if (!id || !tagName) {
			fail(ctx, "请求参数错误", null, 500)
			return 
		}
		const tag = await TagModel.findOne({
			_id: id,
		})
		if (!tag) {
			fail(ctx, "标签不存在", null, 500)
			return
		}
		const updateTag = await TagModel.updateOne(
			{
				_id: id,
			},
			{
				tag_name: tagName,
				// updateAt: new Date(),
			}
		)
		if (!updateTag) {
			fail(ctx, "更新失败", null, 500)
			return 
		}
		success(ctx, {
			data: [],
		})
	}
}
export default new TagController()
