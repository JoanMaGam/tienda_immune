const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Product = require('../models/product.model');

//el checktoken lo podemos calcar para la practica final solo prestar atencion a como pedimos el usuario al final y la BD.
const checkToken = async (req, res, next) => {

    //Comprobamos si el token viene en la cabecera
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera de Authorization' });
    }


    const token = req.headers['authorization'];

    // Compruebo la velidez del token
    let payload;
    try {
        payload = jwt.verify(token, 'con cien cañones por banda'); //la frase debe ser la misma de cuando cree el token en utils.js
    } catch (error) {
        return res.json({ fatal: 'El token es incorrecto' });

    }

    //payload (user_id, user_name, user_role, iat)
    console.log(payload);

    req.user = await User.findById(payload.user_id).populate('cart');
    console.log(req.user);






    next();
};

const checkProductId = async (req, res, next) => {
    const { productId } = req.params;

    try {

        const product = await Product.findById(productId)

        if (!product) {
            return res.json({ fatal: 'El producto no existe en la BD' })
        }

        next();
    } catch (error) {
        return res.json({ fatal: 'El id del producto tiene un formato incorrecto' }) //revisar 19:25h una mica abans
    }
};


module.exports = { checkToken, checkProductId };