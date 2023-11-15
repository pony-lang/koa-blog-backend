import { Context, Next } from "koa";
import { verify } from "../utils/jwtToken";
function AuthMiddleware(ctx: Context, next: Next) {
    const token = ctx.header.authorization
    if (token) {
        const { error } = verify(token)
        if (error != null && error != undefined) {
            ctx.body = {
                msg: error.message,
                code: -1
            }
            return
        }
        return next()
    }
    return ctx.body = {
        msg: 'token不可为空',
        code: 4000
    }
}
export default AuthMiddleware