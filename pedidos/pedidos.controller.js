import Pedido from './pedidos.model';

async function calculatePopularity(id) {
  try{
  const pedidosEntregados = await Pedido.aggregate([
    {
      $match: {
        estado: 'ENTREGADO'
      }
    },
    {
      $group: {
        _id: id,
        total: { $sum: 1 }
      }
    }
  ]);

  return pedidosEntregados[0].total
}catch (error) {
    console.error('Error al calcular la popularidad del restaurante:', error);
    throw error;
}
  
}

export async function createPedido(req, res) {
    try {
      const {
        id_restaurante,
        id_usuario,
        total,
        estado,
        Pedidos
      } = req.body;
  
      const pedido = new Pedido({
        id_restaurante,
        id_usuario,
        total,
        estado,
        Pedidos
      });
  
      const resultado = await pedido.save();
  
      res.status(201).json({
        message: 'Pedido creado con éxito',
        pedido: resultado
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  
export async function getPedidoById(req, res) {
    try {
      const id_pedido = req.params.id; 
  
      const pedido = await Pedido.findById(id_pedido);
  
      if (!pedido || pedido.eliminado !== false) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }

export async function getPedidoByUsuario(req, res) {
    const id_usuario = req.params.id; 
    const { id_restaurante, finicial, ffinal} = req.body;
    const fechaInicial = new Date(finicial);
    const fechaFinal = new Date(ffinal);
    try {
      pedidos = Pedido.find(
        { id_usuario: id_usuario, 
            estado: { $in: ['ENVIADO', 'REALIZADO'] },
            eliminado: false,
            id_restaurante: id_restaurante,
            fecha_creacion: { $gte: fechaInicial, $lte: fechaFinal } }
      ).exec();

      res.status(200).json(pedidos);

    } catch (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(deliverys);
  };
  

  export async function getPedidosEnviados(req, res){
    try{
        const { estado } = req.query;

        let pedidos;
        const condiciones = { eliminado: false }; 

        if (estado) {
          condiciones.estado = estado; 
        }

        pedidos = await Pedido.find(condiciones);
      
        
        if(pedidos.length > 0){
            res.status(200).json(pedidos);
        }else{
            res.status(200).json('No hay pedidos ' + estado +  ' en el momento.');
        }

    }catch (err) {
      res.status(500).json(err);
    }
  }

  export async function updatePedidoById(req, res) {
    try {
      const id_pedido = req.params.id; 
      // const updatedData = req.body;

      const updatedData = {
        id_restaurante,
        id_usuario,
        total,
        estado,
        Pedidos
      } = req.body;
  
      const pedido = await Pedido.findById(id_pedido);
  
      if (!pedido || pedido.eliminado !== false) {
        return res.status(404).json({ message: 'pedido no encontrado' });
      }
  
      Object.assign(pedido, updatedData);
  
      const resultado = await Pedido.save();
  
      res.status(200).json({
        message: 'pedido actualizado con éxito',
        pedido: resultado,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export async function disablePedidoById(req, res) {
    try {
      const pedidoId = req.params.id; 
     
      const pedido = await Pedido.findById(pedidoId);
  
      if (!pedido || pedido.eliminado !== false) {
        return res.status(404).json({ message: 'pedido no encontrado' });
      }
  
        pedido.estado = 'inactivo';
        const resultado = await Pedido.save();
  
      res.status(200).json({
        message: 'pedido inhabilitado con éxito',
        pedido: resultado,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
