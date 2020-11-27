const connection = require('../../database/connections')

// connection('lista_produtos as lp').select('lp.id', 'l.data', 'p.descricao', 'c.nome', 'lp.quantidade', 'lp.valor', 'lp.status').innerJoin('produtos as p', 'p.id', 'lp.produto_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').innerJoin('listas as l', 'l.id', 'lp.lista_id')
const produtosApiController = {
    index: async(req, res) => {
        try {
            if (Object.keys(req.params).length === 0 && Object.keys(req.query).length === 0) {
                const produtos = await connection('produtos as p').select('p.id', 'p.descricao', 'c.nome', 'p.categoria_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').orderBy([{ column: 'c.nome' }, { column: 'p.descricao', order: 'asc' }])
                return res.status(200).json(produtos)

            } else if (Object.keys(req.params).length > 0 && Object.keys(req.query).length === 0) {
                const produto = await connection('produtos as p').select('p.id', 'p.descricao', 'c.nome', 'p.categoria_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').where('p.id', req.params.id).orderBy('p.descricao', 'c.nome', 'asc')
                return res.status(200).json(produto)

            } else if (Object.keys(req.params).length === 0 && Object.keys(req.query).length > 0) {
                // return res.status(200).json(query)
                const produtos = await connection('produtos as p').select('p.id', 'p.descricao', 'c.nome', 'p.categoria_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').where(`${Object.keys(req.query)}`, 'like', `%${req.query[Object.keys(req.query)]}%`).orderBy([{ column: 'c.nome' }, { column: 'p.descricao', order: 'asc' }])
                return res.status(200).json(produtos)
            }

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },

    create: async(req, res) => {
        try {

            const { descricao, categoria_id } = req.body
            const produtoCreate = {
                descricao,
                categoria_id
            }

            const id = await connection('produtos').returning('id').insert(produtoCreate)
            return res.status(200).json(id)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    update: async(req, res) => {
        try {
            const { id, descricao, categoria_id } = req.body
            const produtoUpdate = {
                id,
                descricao,
                categoria_id

            }
            const update = await connection('produtos').where('id', id).update(produtoUpdate)
            return res.status(200).json(update)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    delete: async(req, res) => {
        try {

            const { id } = req.body
            const del = await connection('produtos').where('id', id).del()
            return res.status(200).json(del)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    deleteParams: async(req, res) => {
        try {

            const { id } = req.params
            const del = await connection('produtos').where('id', id).del()
            return res.status(200).json(del)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
}
module.exports = produtosApiController