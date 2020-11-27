const jwt = require('jsonwebtoken');
const { default: Axios } = require('axios');
const { response } = require('express');
require('dotenv').config()
const jwtPass = process.env.JWT_PASS
const produtosController = {
    index: async(req, res) => {

        const usuarioLogado = await jwt.verify(req.session.token, jwtPass)
            // console.log(Object.keys(req.query)[0])
            // console.log(req.query[Object.keys(req.query)[0]])
            // const busca = Object.keys(req.query).length > 0 ? `${Object.keys(req.query)[0]}=${req.query[Object.keys(req.query)[0]]}` : `p.descricao=`
        const reponseProduct = await Axios.get(`${process.env.API_URL}/produtos`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        const reponseCategory = await Axios.get(`${process.env.API_URL}/categorias`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        const link = {
            homePage: '',
            produtoPage: 'active',
            compraPage: '',
            relatorioPage: '',
            ajustePage: '',
            token: req.session.token,
            url: process.env.API_URL
        }
        const produtos = reponseProduct.data
        const categorias = reponseCategory.data
        return res.render('pages/produtos', { usuarioLogado, link, produtos, categorias })
    },
    show: async(req, res) => {

        const usuarioLogado = await jwt.verify(req.session.token, jwtPass)
        const resProduto = await Axios.get(`${process.env.API_URL}/produtos/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        const reponseCategory = await Axios.get(`${process.env.API_URL}/categorias`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        const link = {
            homePage: '',
            produtoPage: 'active',
            compraPage: '',
            relatorioPage: '',
            ajustePage: '',
            token: req.session.token,
            url: process.env.API_URL
        }
        const produto = resProduto.data
        const categorias = reponseCategory.data
        console.log(produto)
        return res.render('pages/produtoView', { usuarioLogado, link, produto, categorias })
    },
    create: async(req, res) => {
        await Axios.post(`${process.env.API_URL}/produtos`, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        res.redirect('/produtos')
    },
    update: async(req, res) => {

        await Axios.put(`${process.env.API_URL}/produtos`, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        res.redirect('/produtos/' + req.body.id)
    },
    delete: async(req, res) => {
        const { id } = req.body
            // res.send({ id })
        await Axios.delete(`${process.env.API_URL}/produtos/${id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`,
                'Content-Type': 'application/json'
            }
        })
        res.redirect('/produtos')
    },
}
module.exports = produtosController