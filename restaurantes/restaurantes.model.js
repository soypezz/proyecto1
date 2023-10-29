import moongose from 'mongoose';


const restauranteSchema = moongose.Schema({
  id_admin: { type: String, required: true },
  nombre: { type: String, required: [true, 'Nombre del restaurante'] },
  direccion: { type: String, required: [true, 'Dirección del restaurante'] },
  categoria: { type: String, required: [true, 'Categoría del restaurante'] },
  capacidad: { type: Number, required: [true, 'Capacidad del restaurante'] },
  estado: { type: Boolean, default: true },
  popularidad: {type: Number}
});

export default moongose.model('Restaurante', restauranteSchema);
