const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        user_id: user._id,
        user_role: user.role,
        user_name: user.username
    } //estas son las 3 claves que hemos codificado dentro del token
    return jwt.sign(payload, 'con cien cañones por banda');

}


module.exports = { createToken };