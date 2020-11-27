const express = require('express')
const router = express.Router()
const authApi = require('../../middleware/api/middlewareApi')
const usuarioApiController = require('../../controllers/api/usuarioApiController')
const categoriaApiController = require('../../controllers/api/categoriaApiController')
const produtoApiController = require('../../controllers/api/produtosApiControllers')
const listasApiController = require('../../controllers/api/listaApiController')
const listasProdutoApiController = require('../../controllers/api/listaProdutosApiController')
const authApiController = require('../../controllers/api/authApiController')

// ######## ROTA ATENTICAÇÃO #################
router.post('/auth', authApiController.auth)

// ######## ROTAS USUÁRIOS #################
router.get('/usuarios', authApi.auth, usuarioApiController.index)
router.get('/usuarios/:id', authApi.auth, usuarioApiController.index)
router.post('/usuarios', usuarioApiController.create)
router.put('/usuarios', authApi.auth, usuarioApiController.update)
router.delete('/usuarios', authApi.auth, usuarioApiController.delete)

// ######## ROTAS CATEGORIA #################
router.get('/categorias', authApi.auth, categoriaApiController.index)
router.get('/categorias/:id', authApi.auth, categoriaApiController.index)
router.post('/categorias', authApi.auth, categoriaApiController.create)
router.put('/categorias', authApi.auth, categoriaApiController.update)
router.delete('/categorias', authApi.auth, categoriaApiController.delete)

// ######## ROTAS PRODUTO #################
router.get('/produtos', authApi.auth, produtoApiController.index)
router.get('/produtos/:id', authApi.auth, produtoApiController.index)
router.post('/produtos', authApi.auth, produtoApiController.create)
router.put('/produtos', authApi.auth, produtoApiController.update)
router.delete('/produtos', authApi.auth, produtoApiController.delete)
router.delete('/produtos/:id', authApi.auth, produtoApiController.deleteParams)

// ######## ROTAS LLISTAS #################
router.get('/listas', authApi.auth, listasApiController.index)
router.get('/listas/:id', authApi.auth, listasApiController.index)
router.post('/listas', authApi.auth, listasApiController.create)
router.put('/listas', authApi.auth, listasApiController.update)
router.delete('/listas', authApi.auth, listasApiController.delete)

// ######## ROTAS LLISTAS #################
router.get('/listas-produtos', authApi.auth, listasProdutoApiController.index)
router.get('/listas-produtos/:id', authApi.auth, listasProdutoApiController.index)
router.post('/listas-produtos', authApi.auth, listasProdutoApiController.create)
router.put('/listas-produtos', authApi.auth, listasProdutoApiController.update)
router.delete('/listas-produtos', authApi.auth, listasProdutoApiController.delete)


module.exports = router