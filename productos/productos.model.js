import moongose from 'mongoose';

const ProductoSchema = new moongose.Schema({
  id_restaurante: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  estado: { type: String, default: true}

});

export default moongose.model('Productos', ProductoSchema);

