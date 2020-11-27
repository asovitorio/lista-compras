const auth = {
    session: (req, res, next) => {
        if (req.session.token) {
            return next()
        } else {
            console.log('sessão invalida')
            return res.render('error')
        }
    }
}
module.exports = auth