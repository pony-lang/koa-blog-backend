/*
 * @Author: bin
 * @Date: 2023-11-16 15:45:45
 * @LastEditors: bin
 * @LastEditTime: 2023-12-12 14:12:37
 * @objectDescription: 入口文件
 */
export interface UserListType {
	username?: string
	email?: string
	offset: number
	limit: number
}
export interface UserType {
	username: string
	email: string
	password: string
	nickname: string
	usertype: number
}
export interface deleteType {
	id: string
}
