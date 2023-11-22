/*
 * @Author: bin
 * @Date: 2023-11-21 11:31:17
 * @LastEditors: bin
 * @LastEditTime: 2023-11-22 17:27:26
 * @objectDescription: 入口文件
 */
import { Context } from 'koa'
import { fail, success } from "../../utils/response";
import { ArticleModel } from '../../db/schema/SchemaArticle'
import { TagModel } from '../../db/schema/SchemaTag'
import type * as Article from './types/article'
import { guid } from '../../utils/guid';
class ArticleIndexController {
    async createArticle(ctx: Context) {
        const requestBody = ctx.request['body'] as Article.ArticleType
        const { title, content, author, tags } = requestBody
        if (!title || !content || !author || !tags) {
            fail(ctx, '请求参数错误', null, 400)
            return;
        }
        const existingTags = await TagModel.find({
            tag_name: {
                $in: tags
            }
        }).select('tag_name').exec()
        // 已存在的标签
        const existingTagNames = existingTags.map((tag) => tag.tag_name.toString());
        // 不存在的标签
        tags.filter((tag) => !existingTagNames.includes(tag)).forEach(async (tag1) => {
            console.log(tag1, 'tag');
            let newTagRes = await TagModel.create({
                tag_name: tag1
            })
            console.log(newTagRes, 'newTagRes');
            existingTagNames.push(newTagRes.tag_name.toString())
        })

        // console.log(existingTagNames, 'existingTagNames');
        // const articleRes = await ArticleModel.create({
        //     title,
        //     content,
        //     author,
        //     tags: existingTagNames,
        // })
        // if (articleRes) {
        //     success(ctx, [], '创建成功', 200)
        // } else {
        //     fail(ctx, '创建失败', null, 500)
        // }
    }
}
export default new ArticleIndexController