/*
 * @Author: bin
 * @Date: 2023-11-20 11:24:55
 * @LastEditors: bin
 * @LastEditTime: 2023-11-27 09:50:37
 * @objectDescription: 入口文件
 */
import Schema, { Rules, Values } from "async-validator";
import { Context } from "koa";

/**
 * 异步函数，用于验证输入的数据是否符合给定的规则
 * @param ctx - 上下文对象，包含了验证所需的信息
 * @param rules - 验证规则
 * @returns Promise，包含验证通过后的数据和错误信息
 */
async function validate<T extends Values>(ctx: Context, rules: Rules): Promise<{ data: T, errors: any | null }> {
    const validator = new Schema(rules) // 创建一个验证器对象
    let data = {} // 初始化一个空的数据对象
    return await validator.validate(data).then(() => {
        return {
            data: data as T, // 将验证通过后的数据转换为指定的类型T
            errors: null // 无错误信息
        }
    }).catch(err => {
        return {
            data: {} as T, // 初始化一个空的验证通过后的数据对象，转换为指定的类型T
            errors: err.errors // 错误信息
        }
    })
}
export default validate
