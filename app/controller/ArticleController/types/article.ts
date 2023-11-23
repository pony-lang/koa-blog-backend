export interface ArticleType  {
    title: string
    content: string
    author: string
    tags: string[]
}
export interface ArticleListType {
    offset: number
    limit: number
    title?: string
    tags?: string[]
}