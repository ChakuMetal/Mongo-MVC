const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { createToken } = require('../utils/createToken');



// login
const register = async (req, res) => {
    try {
        const { nombre, email, edad, password } = req.body;

        if(!nombre | !email | !password) {
            return res.status(400).json({error: "Nombre, email y password son obligatorios"})
        }

    const newUser = await User.findOne ({email})

    if(newUser) {
        return res.status(409).json({ error: "El email ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

    const createUser = await User.create({
        nombre,
        email,
        edad,
        password: hashed
    });
    
    const token = createToken(createUser._id);

    return res.status(201).json({
        user: {
            id: createUser._id,
            nombre: createUser.nombre,
            email: createUser.email,
            edad: createUser.edad
        },
        token
    })

    } catch (error) {
        return res.status(500).json({error: 'Error en el servidor'})
    }
}

const login = async (req, res) => {
    try {
    const { email, password } = req.body;
    //validación de los campos de entrada del login
        if(!email | !password) {
    return res.status(400).json({error: "Email y password son obligatorios"})
        }

        //Buscar el usuario en la base de datos por su email
const user = await User.findOne({email});

if (!user) {
    return res.status(401).json({error: "Credenciales inválidas"})
}

//comparar las contraseñas que nos ha enviado el usuario con las que 
// tenemos en la base de datos
const passwordOk = await bcrypt.compare(password, user.password);

if (!passwordOk) {
    return res.status(401).json({error: "Credenciales inválidas"})
}

//crear el token para logearse
const token = createToken(user._id)

//responder sin exponer la contraseña
return res.status(200).json({
    user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        edad: user.edad
    },
    token
})

    } catch (err) {
return res.status(500).json({error: 'Error en el servidor'})
    }

}

//GET PROFILE: obtener el perfil del usuario logeado
const getProfile = async(req, res) => {
try{
    const user = await User.findById(req.user.id).select("-password") //aqui excluimos la contraseña

    if (!user){
        return res.status(404).json({error: "Usuario no encontrado"}) //en el caso de no encontrar el usuario
    }
    return res.status(200).json({user});//si todo va bien devolvemos el usuario

} catch (err) {
return res.status(500).json({error: 'Error en el servidor'})

}


}




module.exports = { register, login, getProfile };