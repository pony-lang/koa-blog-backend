export interface CommenstList {
    offset: number
	limit: number
	content?: string
	status?: string
    title?: string
    commentUserName?: string
}
export interface CreateComment {
	userid: string
    articleid: string
	content: string
}
export interface UpdateComment {
    id: string
    status: string
}
export interface DeleteComment {
    id: string
}
export interface ReplyComment {
    id: string
    content: string
    userid: string
    commentid: string
    articleid: string
}