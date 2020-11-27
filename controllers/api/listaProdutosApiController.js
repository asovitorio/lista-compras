const connection = require('../../database/connections')


const listaProdutoApiController = {
    index: async(req, res) => {
        try {
            if (Object.keys(req.params).length === 0 && Object.keys(req.query).length === 0) {
                const lista_produtos = await connection('lista_produtos as lp').select('lp.id', 'lp.lista_id', 'l.data', 'p.descricao', 'c.nome', 'lp.quantidade', 'lp.valor', 'lp.valor_un', 'lp.status').innerJoin('produtos as p', 'p.id', 'lp.produto_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').innerJoin('listas as l', 'l.id', 'lp.lista_id').orderBy('c.nome', 'asc')
                return res.status(200).json(lista_produtos)

            } else if (Object.keys(req.params).length > 0 && Object.keys(req.query).length === 0) {
                const lista = await connection('lista_produtos as lp').select('lp.id', 'lp.lista_id', 'l.data', 'p.descricao', 'c.nome', 'lp.quantidade', 'lp.valor', 'lp.valor_un', 'lp.status').innerJoin('produtos as p', 'p.id', 'lp.produto_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').innerJoin('listas as l', 'l.id', 'lp.lista_id').where('lp.id', req.params.id)
                return res.status(200).json(lista)

            } else if (Object.keys(req.params).length === 0 && Object.keys(req.query).length > 0) {
                // return res.status(200).json(query)
                const lista_produtos = await connection('lista_produtos as lp').select('lp.id', 'lp.lista_id', 'l.data', 'p.descricao', 'c.nome', 'lp.quantidade', 'lp.valor', 'lp.valor_un', 'lp.status').innerJoin('produtos as p', 'p.id', 'lp.produto_id').innerJoin('categorias as c', 'c.id', 'p.categoria_id').innerJoin('listas as l', 'l.id', 'lp.lista_id').where(`${Object.keys(req.query)}`, 'like', `%${req.query[Object.keys(req.query)]}%`).orderBy('p.descricao', 'c.nome', 'asc')
                return res.status(200).json(lista_produtos)
            }

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },

    create: async(req, res) => {
        try {
            const { lista_id, produto_id, quantidade, valor, valor_un, status } = req.body
            const listaCreate = {
                lista_id,
                produto_id,
                quantidade,
                valor,
                valor_un,
                status
            }
            const id = await connection('lista_produtos').returning('id').insert(listaCreate)
            return res.status(200).json(id)
        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    update: async(req, res) => {
        try {
            const { id, lista_id, produto_id, quantidade, valor, valor_un, status } = req.body
            const listaUpdate = {
                lista_id,
                produto_id,
                quantidade,
                valor,
                valor_un,
                status
            }
            const update = await connection('lista_produtos').where('id', id).update(listaUpdate)
            return res.status(200).json(update)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.body

            const del = await connection('lista_produtos').where('id', id).del()
            return res.status(200).json(del)

        } catch (error) {
            return res.status(400).json({ msg: error })
        }
    },
}
module.exports = listaProdutoApiController