const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Header Authorization, y si no fuera válido usara un string vacío, y lo dividimos en tipo y token

    try{
        const header = req.headers.authorization || "";
        const [type, token] = header.split(" "); // "Bearer token"
// si no hay bearer o token:
if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token no proporcionado o formato inválido"});
}
// si hay token ---> se verifica
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: verifyToken.id }; // req.user = verifyToken.id; // añadimos el id del usuario al req
        next();

    } catch(err) {
        return res.status(401).json({ error: "Token no válido o expirado" });
    }
};

module.exports = auth;
