const connection = require('../../database/connections')


const categoriaApiController = {
    index: async(req, res) => {
        try {
            if (Object.keys(req.params).length === 0 && Object.keys(req.query).length === 0) {
                const categorias = await connection().table('categorias')
                return res.status(200).json(categorias)

            } else if (Object.keys(req.params).length > 0 && Object.keys(req.query).length === 0) {
                const categoria = await connection('categorias').where('id', req.params.id)
                return res.status(200).json(categoria)

            } else if (Object.keys(req.params).length === 0 && Object.keys(req.query).length > 0) {
                // return res.status(200).json(query)
                const categorias = await connection('categorias').where(`${Object.keys(req.query)}`, 'like', `%${req.query[Object.keys(req.query)]}%`)
                return res.status(200).json(categorias)
            }

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },

    create: async(req, res) => {
        try {
            const { nome } = req.body
            const categoriaCreate = {
                nome,
            }
            const id = await connection('categorias').returning('id').insert(categoriaCreate)
            return res.status(200).json(id)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    update: async(req, res) => {
        try {
            const { id, nome } = req.body
            const categoriaUpdate = {
                id,
                nome,

            }
            const update = await connection('categorias').where('id', id).update(categoriaUpdate)
            return res.status(200).json(update)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.body

            const del = await connection('categorias').where('id', id).del()
            return res.status(200).json(del)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
}
module.exports = categoriaApiController