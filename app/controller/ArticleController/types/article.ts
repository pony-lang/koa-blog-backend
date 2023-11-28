export interface ArticleType {
	title: string
	content: string
	author: string
	tags: string[]
}
export interface ArticleListType {
	offset: number
	limit: number
	title?: string
	tags?: string
}
export interface ArticleDetailType {
	id: string
}
export interface updateType{
    title: string
    content: string
    tags: string[]
    userid: string
    id: string
}