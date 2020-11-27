const jwt = require('jsonwebtoken');
const { default: Axios } = require('axios');
require('dotenv').config()
const jwtPass = process.env.JWT_PASS

const homeController = {
    index: async(req, res) => {
        const usuarioLogado = await jwt.verify(req.session.token, jwtPass)
            // const usuarios = await Axios.get(`${process.env.API_URL}/listas-produtos?l.usuario_id=2`, {
            //     headers: {
            //         Authorization: `Bearer ${req.session.token}`,
            //         'Content-Type': 'application/json'
            //     }

        // })
        const link = {
            homePage: 'active',
            produtoPage: '',
            compraPage: '',
            relatorioPage: '',
            ajustePage: '',
        }

        return res.render('pages/home', { usuarioLogado, link })
    }
}
module.exports = homeController