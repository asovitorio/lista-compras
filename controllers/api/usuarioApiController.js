const connection = require('../../database/connections')
var bcrypt = require('bcryptjs');

const usuarioApiController = {
    index: async(req, res) => {
        try {
            if (Object.keys(req.params).length === 0 && Object.keys(req.query).length === 0) {
                const usuarios = await connection().table('usuarios')
                return res.status(200).json(usuarios)
            } else if (Object.keys(req.params).length > 0 && Object.keys(req.query).length === 0) {
                const usuario = await connection('usuarios').where('id', req.params.id)
                return res.status(200).json(usuario)

            } else if (Object.keys(req.params).length === 0 && Object.keys(req.query).length > 0) {
                // return res.status(200).json(query)
                const usuarios = await connection('usuarios').where(`${Object.keys(req.query)}`, 'like', `%${req.query[Object.keys(req.query)]}%`)
                return res.status(200).json(usuarios)
            }

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },

    create: async(req, res) => {
        try {

            const { nome, usuario, senha } = req.body
            const usuarioCreate = {
                nome,
                usuario,
                senha: bcrypt.hashSync(senha, 10)
            }
            const id = await connection('usuarios').returning('id').insert(usuarioCreate)
            return res.status(200).json(id)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    update: async(req, res) => {
        try {
            const { id, nome, usuario, senha } = req.body
            const usuarioUpdate = {
                id,
                nome,
                usuario,
                senha: bcrypt.hashSync(senha, 10)
            }
            const update = await connection('usuarios').where('id', id).update(usuarioUpdate)
            return res.status(200).json(update)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.body

            const del = await connection('usuarios').where('id', id).del()
            return res.status(200).json(del)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
}
module.exports = usuarioApiController