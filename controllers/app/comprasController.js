const jwt = require('jsonwebtoken');
const { default: Axios } = require('axios');
require('dotenv').config()
const jwtPass = process.env.JWT_PASS
const moment = require('moment')
const comprasController = {
    index: async(req, res) => {
        const usuarioLogado = await jwt.verify(req.session.token, jwtPass)

        const respostaListas = await Axios.get(`${process.env.API_URL}/listas?usuario_id=${usuarioLogado.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }

        })
        const reponseProduct = await Axios.get(`${process.env.API_URL}/produtos`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        const link = {
            homePage: '',
            produtoPage: '',
            compraPage: 'active',
            relatorioPage: '',
            ajustePage: '',
            token: req.session.token,
            url: process.env.API_URL
        }
        const listas = respostaListas.data
        const produtos = reponseProduct.data

        return res.render('pages/compras', { usuarioLogado, link, listas, moment, produtos })
    },
    show: async(req, res) => {

        const usuarioLogado = await jwt.verify(req.session.token, jwtPass)

        const respostaListas = await Axios.get(`${process.env.API_URL}/listas-produtos?lp.lista_id=${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }

        })
        const reponseProduct = await Axios.get(`${process.env.API_URL}/produtos`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        const link = {
            homePage: '',
            produtoPage: '',
            compraPage: 'active',
            relatorioPage: '',
            ajustePage: '',
            token: req.session.token,
            url: process.env.API_URL
        }
        const listas = respostaListas.data
        const produtos = reponseProduct.data

        return res.render('pages/itens', { usuarioLogado, link, listas, moment, produtos })
    },
    update: async(req, res) => {

        const { id, lista_id, quantidade, valor_un, status } = req.body
        const iten = {
            id: parseInt(id),
            lista_id: parseInt(lista_id),
            quantidade: parseFloat(quantidade),
            valor_un: parseFloat(valor_un).toFixed(2),
            valor: (quantidade * valor_un).toFixed(2),
            status: status == 0 ? true : false
        }

        const respostaListas = await Axios.put(`${process.env.API_URL}/listas-produtos`, iten, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }

        })


        return res.redirect('/compras/' + lista_id)
    },

}
module.exports = comprasController