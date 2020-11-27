const { default: Axios } = require('axios')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtPass = process.env.JWT_PASS

const loginController = {
    index: (req, res) => {
        return res.render('index', { msg: false, form: 'fomLogin.ejs', btn: true })
    },
    auth: async(req, res) => {
        const { usuario, senha } = req.body
        usuarioLogin = {
            usuario,
            senha
        }
        try {
            const login = await Axios.post(`${process.env.API_URL}/auth`, usuarioLogin)
            console.log(login.data)
            const token = login.data
            const usuario = await jwt.verify(token, jwtPass)
            req.session.token = token
            console.log(token)
            res.redirect('/home')

        } catch (error) {
            console.log('teste')
            return res.render('index', { msg: true, form: 'fomLogin.ejs', btn: true })
        }
    },
    logout: (req, res) => {
        req.session.token = false
        res.redirect('/')
    },
    indexAcount: (req, res) => {
        return res.render('index', { msg: false, form: 'fomCreateAcount.ejs', btn: false })
    },
    createAcount: async(req, res) => {
        const usuarios = await Axios.post(`${process.env.API_URL}/usuarios`, req.body)
        return res.redirect('/')
    },
}

module.exports = loginController