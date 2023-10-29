import Producto from './productos.model';

export async function createProducto(req, res) {
  try {
    const {
      id_restaurant,
      nombre,
      descripcion,
      categoria,
      precio,
      estado
    } = req.body;

    const producto = new Producto({
      id_restaurant,
      nombre,
      descripcion,
      categoria,
      precio,
      estado
    });

    const resultado = await producto.save();

    res.status(201).json({
      message: 'Producto creado con éxito',
      producto: resultado
    });
  } catch (err) {
    res.status(500).json(err);
  }
}


export async function getProductoById(req, res) {
    try {
      const productoId = req.params.id; 
  
      const producto = await Producto.findById(productoId);
      
      if (!producto || producto.estado !== true) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json(producto);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  
export async function getProductosByRestauranteCategoria(req, res) {
    try {
      const { restaurante, categoria } = req.query;
  
      const filter = {};
  
      if (restaurante) {
        filter.id_restaurant = restaurante;
      }
  
      if (categoria) {
        filter.categoria = categoria;
      }
  
      const productos = await Producto.find(filter);
  
      res.status(200).json(productos);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  
export async function updateProductoById(req, res) {
    try {
      const productoId = req.params.id; 
      const updatedData = req.body;
  
      const producto = await Producto.findById(productoId);
  
      if (!producto || producto.estado !== true) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      Object.assign(producto, updatedData);
  
      const resultado = await producto.save();
  
      res.status(200).json({
        message: 'Producto actualizado con éxito',
        producto: resultado,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export async function disableProductoById(req, res) {
    try {
      const productoId = req.params.id; 
      const producto = await Producto.findById(productoId);
  
      if (!producto || producto.estado !== true) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      producto.estado = 'inactivo';
  
      const resultado = await producto.save();
  
      res.status(200).json({
        message: 'Producto inhabilitado con éxito',
        producto: resultado,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
