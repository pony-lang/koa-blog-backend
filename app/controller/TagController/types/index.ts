/*
 * @Author: bin
 * @Date: 2023-11-24 09:37:22
 * @LastEditors: bin
 * @LastEditTime: 2023-11-27 10:36:18
 * @objectDescription: 入口文件
 */
export interface TagListType {
	offset: number
	limit: number
	tagName: string
}
export interface CreateType {
    tagName: string
}

export interface DelOneType {
    id: string
}
export interface updateOneType {
    id: string
    tagName: string
}