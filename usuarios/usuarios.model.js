import mongoose from 'mongoose';


const usuariosSchema = mongoose.Schema({

    correo_electronico: {type: String, required: [true, 'Correo electrónico.']},
    nombre: {type: String, required: [true, 'Nombre de usuario.']},
    contraseña: {type: String, required: [true, 'contraseña.']},
    telefono: {type: Number, required: [true, 'Número de telefono.']},
    direccion: {type: String, required: [true, 'Dirección de domicilio.']},
    rol: { type: String, enum: ['admin', 'cliente'], required: [true, 'Rol del usuario.'] },
    estado: { type: Boolean, default: true }
});

export default mongoose.model('usuarios', usuariosSchema);
