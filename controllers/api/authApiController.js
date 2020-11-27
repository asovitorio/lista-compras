const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
require('dotenv').config()
const jwtPass = process.env.JWT_PASS
const connection = require('../../database/connections')

const authApiController = {
    auth: async(req, res) => {
        const { usuario, senha } = req.body
        try {
            const usuarioLogin = await connection.where('usuario', usuario).from('usuarios')

            if (usuario === undefined || usuarioLogin.length === 0) {
                return res.status(401).json({ msg: "Não Autorizado" });
            }
            if (senha === undefined || !bcrypt.compareSync(senha, usuarioLogin[0].senha)) {
                return res.status(401).json({ msg: "Não Autorizado" });
            }
            const usuarioAutenticado = {
                id: usuarioLogin[0].id,
                nome: usuarioLogin[0].nome,
                usuario: usuarioLogin[0].usuario,
                status: usuarioLogin[0].status
            }
            const token = await jwt.sign(usuarioAutenticado, jwtPass, { expiresIn: '8h' })
            return res.status(200).json(token)
        } catch (error) {
            return false
        }
    }
}

module.exports = authApiController