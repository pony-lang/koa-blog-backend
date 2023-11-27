/*
 * @Author: bin
 * @Date: 2023-11-15 11:29:17
 * @LastEditors: bin
 * @LastEditTime: 2023-11-27 09:50:20
 * @objectDescription: 分页工具
 */
/**
 * 分页函数
 * @param total 总数
 * @param pageSize 每页数量
 * @param currentPage 当前页码
 * @returns 分页结果
 */
function paginate(
	total: number,
	pageSize: number,
	currentPage: number
): {
	total: number
	totalPage: number
	pageSize: number
	current_page: number
} {
	const totalPage = Math.ceil(total / pageSize)
	const current_page = currentPage > 0 ? currentPage : 1

	return {
		total,
		totalPage,
		pageSize,
		current_page,
	}
}

export { paginate }
