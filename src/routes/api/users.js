const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/utils')
const User = require('../../models/user.model');
const { checkToken } = require('../../helpers/middlewares');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('cart'); //populate hace que te devuelva los datos de lo que le pones.
        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.post('/register', async (req, res) => {

    //encriptar la password
    req.body.password = bcrypt.hashSync(req.body.password);

    //crear el user en la BD
    const newUser = await User.create(req.body);
    res.json(newUser);
});

router.post('/login', async (req, res) => {
    //mirar si el usuario con el mail recibido esta en la BD
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ fatal: 'error en email y/o contraseña' });
    }
    //Compruebo la igualdad de las password
    const eq = bcrypt.compareSync(req.body.password, user.password);
    if (!eq) {
        return res.json({ fatal: 'error en email y/o contraseña' });
    }
    res.json({ succes: 'Login correcto', token: createToken(user) });
});

// router.put('/:userId/product/:productId', checkToken, async (req, res) => {
router.put('/product/:productId', checkToken, async (req, res) => {
    // const { userId, productId } = req.params;
    const { productId } = req.params;

    try {

        const user = await User.findById(req.user._id);
        user.cart.push(productId);
        await user.save();

        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});



module.exports = router;