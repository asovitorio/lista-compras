var express = require('express');
var router = express.Router();
const auth = require('../../middleware/app/auth')
const loginController = require('../../controllers/app/loginController')
const homeController = require('../../controllers/app/homeController')
const produtosController = require('../../controllers/app/produtosController')
const comprasController = require('../../controllers/app/comprasController')
const relatoriosController = require('../../controllers/app/relatoriosController')
const ajustesController = require('../../controllers/app/ajustesController')

router.get('/', loginController.index);
router.post('/', loginController.auth);
router.get('/logout', loginController.logout);
router.get('/nova-conta', loginController.indexAcount);
router.post('/nova-conta', loginController.createAcount);

// #################### Home ##############
router.get('/home', auth.session, homeController.index)

// #################### Produtos ##############
router.get('/produtos', auth.session, produtosController.index)
router.post('/produtos', auth.session, produtosController.create)
router.get('/produtos/:id', auth.session, produtosController.show)
router.put('/produtos', auth.session, produtosController.update)
router.delete('/produtos', auth.session, produtosController.delete)

// #################### Compras ##############
router.get('/compras', auth.session, comprasController.index)
router.get('/compras/:id', auth.session, comprasController.show)
router.post('/compras/', auth.session, comprasController.update)
    // #################### relatorios ##############
router.get('/relatorios', auth.session, relatoriosController.index)
    // #################### ajustes ##############
router.get('/ajustes', auth.session, ajustesController.index)

module.exports = router;