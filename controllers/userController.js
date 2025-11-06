// CONTROLADOR --- Contiene la lógica (funciones) que se ejecutan en las rutas -- necesita el modelo
// Recibe la peticiñon (req) >>> Usa el modelo (importamos el modelo) >>> responde (res)

const User = require('../models/UserModel')

// Traer todos los usuarios - que dentro de nuestro CRUD tendrá un READ - un método GET - y el endpoint será la HOME "/"  //
const getAllUsers = async (req, res) => {
    const todosUsuarios = await User.find()
    res.status(200).json(todosUsuarios)
}

// Traer un usuario por ID - READ - GET - endpoint "/:id" //
const getUserById = async (req, res) => {
    try{
    const {id} = req.params;
    const user = await User.findById(id)

    if(!user) {
        return res.status(404).json({ error: "Usuario no encontrado" } ); // Este es el estatus para no encuentra user
    }

return res.status(200).json(user) // Usuario OK
    }catch(err){
        res.status(400).json({error: "ID no válida"}); //id no valida
    }
}
// Crear un usuario (significa postear algo y subir algo) - CREATE - POST - endpoint "/" //
const createUser = async (req, res, next) => {
    try{
   const newUser = new User(req.body) //req.body es el cuerpo de la petición, los datos que enviamos
   const saveUser = await newUser.save() //guardamos en la base de datos
   res.status(201).json(saveUser) //201 es el estatus de creado correctamente
    }catch(err){
        res.status(400).json({error: err.message}) //400 es el estatus de error en la petición
    }
}

// Actualizar un usuario – UPDATE – PUT - /:id
const updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, 
            req.body, 
            {new: true, runValidators: true } //new:true para que nos devuelva el objeto actualizado
        )
            if(!updatedUser){
                return res.status(404).json({error: "Usuario no encontrado"})
            }
// si hay un update user correcto devolverá un 200 que será correcto:
            return res.status(200).json(updatedUser)

        }catch(err){
            return res.status(400).json({error: "ID no válida"})
        }
    }

// Eliminar un usuario – DELETE – DELETE - /:id
const deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        return res.status(204).json({message: 'usuario eliminado correctamente'})

    }catch(err){
        next(err); //pasamos el error al middleware de errores
    }
}

module.exports = {getAllUsers, 
    getUserById, 
    createUser, 
    updateUser,
    deleteUser
}