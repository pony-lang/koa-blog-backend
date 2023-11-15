import jwt from 'jsonwebtoken'
import config from '../config'

function sign(data: any) {
    return jwt.sign({ data }, config.jwt.secretKey as string, { expiresIn: config.jwt.expire })
}

function verify(token: string) {
    try {
        const decoded = jwt.verify(token, config.jwt.secretKey as string)
        return {
            admin: decoded, 
            error: null
        }
    } catch (err) {
        // err
        return {
            admin: null,
            error: err
        }
    }
}

export {
    sign,
    verify
}