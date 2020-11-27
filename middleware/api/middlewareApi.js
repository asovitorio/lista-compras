const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtPass = process.env.JWT_PASS
const authApi = {
    auth: async(req, res, next) => {
        const authToken = await req.headers['authorization'];

        if (authToken != undefined) {
            const bearer = authToken.split(' ')
            const token = bearer[1];
            try {
                const usuario = await jwt.verify(token, jwtPass)
                req.token = token
                req.usuario = usuario
                return next()
            } catch (error) {
                return res.status(401).json({
                    err: "Token invalido!"
                });
            }
        } else {
            return res.status(401).json({
                err: "Token invalido!"
            });
        }
    }
}
module.exports = authApi