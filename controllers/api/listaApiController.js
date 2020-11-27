const { select } = require('../../database/connections')
const connection = require('../../database/connections')


const listaApiController = {
    index: async(req, res) => {
        try {
            if (Object.keys(req.params).length === 0 && Object.keys(req.query).length === 0) {
                const listas = await connection('listas').select('listas.id', 'listas.data', 'listas.usuario_id', 'usuarios.nome', 'usuarios.usuario').innerJoin('usuarios', 'usuarios.id', 'listas.usuario_id')
                return res.status(200).json(listas)

            } else if (Object.keys(req.params).length > 0 && Object.keys(req.query).length === 0) {
                const lista = await connection('listas').select('listas.id', 'listas.data', 'listas.usuario_id', 'usuarios.nome', 'usuarios.usuario').innerJoin('usuarios', 'usuarios.id', 'listas.usuario_id').where('listas.id', req.params.id)
                return res.status(200).json(lista)

            } else if (Object.keys(req.params).length === 0 && Object.keys(req.query).length > 0) {
                // return res.status(200).json(query)
                // const listas = await connection('listas').select('listas.id', 'listas.data', 'listas.usuario_id', 'usuarios.nome', 'usuarios.usuario').innerJoin('usuarios', 'usuarios.id', 'listas.usuario_id').where(`${Object.keys(req.query)}`, 'like', `%${req.query[Object.keys(req.query)]}%`).orderBy('data', 'desc')
                // return res.status(200).json(listas)

                const listas = await connection('listas as l').select('l.id', 'l.data', 'l.usuario_id', 'u.nome', 'u.usuario').innerJoin('usuarios as u', 'u.id', 'l.usuario_id').innerJoin('lista_produtos as lp', 'l.id', 'lp.lista_id').count('lp.id as itens').sum('lp.valor as valor').where(`${Object.keys(req.query)}`, 'like', `%${req.query[Object.keys(req.query)]}%`).orderBy('l.data', 'desc').groupBy('l.data', 'l.id')
                return res.status(200).json(listas)
            }

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },

    create: async(req, res) => {
        try {
            const { data, usuario_id } = req.body
            const listaCreate = {
                data,
                usuario_id
            }
            const id = await connection('listas').returning('id').insert(listaCreate)
            return res.status(200).json(id)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    update: async(req, res) => {
        try {
            const { id, data, usuario_id } = req.body
            const listaUpdate = {
                id,
                data,
                usuario_id
            }
            const update = await connection('listas').where('id', id).update(listaUpdate)
            return res.status(200).json(update)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.body

            const del = await connection('listas').where('id', id).del()
            return res.status(200).json(del)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
}
module.exports = listaApiController