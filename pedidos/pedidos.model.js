import moongose from 'mongoose';

const PedidoSchema = new moongose.Schema({
  id_restaurante: { type: String, required: true },
  id_usuario: { type: String, required: true },
  total: { type: Number, required: true },
  estado: { type: String,  enum: ['CREADO', 'EN CURSO', 'EN CAMINO', 'ENTREGADO']},
  fecha_creacion: { type: Date, required: true},
  productos: {
    type: [
      {
        id_producto: String,
        cantidad: Number
      },
    ],
    unique: true,
  },
  eliminado: { type: Boolean, default: false }
});

export default moongose.model('Pedidos', PedidoSchema);

