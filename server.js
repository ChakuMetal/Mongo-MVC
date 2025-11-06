//Cargar variables de entorno
require('dotenv').config();

//Importar dependencias
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//crear app de express
const app = express()

//middleware de CORS
// const corsOptions = {
//     origin: "http://localhost:3000", // solo permitir solicitudes desde este origen
//     methods: ["GET", "POST", "PUT", "DELETE"], // métodos permitidos
//     allowedHeaders: ["Content-Type", "Authorization"] // encabezados permitidos
// };
app.use(cors())

//middleware para leer json cuando hagamos una petición a la base de datos
app.use(express.json())

//conexión de mongoDB con mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a Base de Datos 😁'))
    .catch(err => console.error("Error de conexión a Base de Datos 😟", err))

//RUTAS de USER
const UserRoutes = require('./routes/userRoutes')
app.use('/api/users', UserRoutes) //definimos el endpoint de nuestra API hacia este modelo en concreto

//RUTAS de AUTH
const AuthRoutes = require('./routes/authRoutes')
app.use('/api/auth', AuthRoutes) //definimos el endpoint de nuestra API hacia este modelo en concreto


//Manejo de rutas no encontradas (404)
app.use((req, res) => {res.status(404).json({error: "Ruta no encontrada 💀"})})

//Middleware de gestor de errores
const errors = require('./middlewares/errors')
app.use(errors)

// arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Servidor ESCUCHANDO en http://localhost:${PORT}`))









