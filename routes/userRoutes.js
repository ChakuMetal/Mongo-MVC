// RUTA --- Define la URL (endpoints) y el método HTTP (GET, POST, PATCH, PUT, DELETE) y ejecuta un controlador en cada ruta
// CRUD --- Operaciones de Crear, Leer, Actualizar y Borrar

const express = require('express')
const router = express.Router()


const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/userController')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;

