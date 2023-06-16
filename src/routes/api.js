const router = require('express').Router();

const { checkToken } = require('../helpers/middlewares');

router.use('/products', checkToken, require('./api/products'));
router.use('/pruebas', require('./api/pruebas'));
router.use('/users', require('./api/users'));




module.exports = router;