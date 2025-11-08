const jwt = require('jsonwebtoken');

const createToken = (userId) => {
    return jwt.sign(
        { id: userId }, //id del usuario que queremos guardar en el token
        process.env.JWT_SECRET, // secreto para firmar el token
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // tiempo de expiración del token
    ); // con todo esto se genera la firma del token
}
module.exports = { createToken }