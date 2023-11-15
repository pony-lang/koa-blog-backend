/**
 * 分页函数
 * @param total 总数
 * @param pageSize 每页数量
 * @param currentPage 当前页码
 * @returns 分页结果
 */
function paginate(total: number, pageSize: number, currentPage: number): { total: number, pages: number, pageSize: number, current_page: number, prev_page: number, next_page: number, records: any[] } {
    const pages = Math.ceil(total / pageSize)
    const current_page = currentPage > 0 ? currentPage : 1
    const prev_page = current_page > 1 ? current_page - 1 : current_page
    const next_page = current_page < pages ? current_page + 1 : current_page

    const start = (current_page - 1) * pageSize
    const end = start + pageSize

    return {
        total,
        pages,
        pageSize,
        current_page,
        prev_page,
        next_page,
        records: Array.from({ length: pageSize }, (_, index) => start + index)
    };
}

export {
    paginate
}
