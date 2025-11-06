// MODELO --- Representa los datos (schemas en Mongoose)
const mongoose = require('mongoose');

//definir el esquema (forma del documento)
const userSchema = new mongoose.Schema ({
    nombre: {
        type: String, required: true}, //campo obligatorio
    email: {
        type: String, required: true, unique: true}, //campo obligatorio y unico
    edad: {
        type: Number}, //campo opcional
    password: {
        type: String, required: true, minlength: 6}
}, {timestamps: true}); //crea campos automáticos de createdAt y updatedAt);

    //crear el modelo a partir del esquema
    module.exports = mongoose.model('User', userSchema);
    
7    