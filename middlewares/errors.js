// Middleware centralizado de gestor de errores
const errors = (err, req, res, next) => {
    console.error("😵 Error:", err.message);
// Error de servidor
if(!err.status){
    return res.status(500).json({error: "Error de servidor"})
}

// Error de usuario no encontrado
if (err.status === 404){
    return  res.status(404).json({error:"Usuario no encontrado"})
}

// Por defecto
return res.status(err.status).json({error: err.message})
}

module.exports = errors;