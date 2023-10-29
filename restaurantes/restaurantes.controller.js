import Restaurante from './restaurantes.model';


export async function createRestaurante(req, res) {
  try {
    const {
      id_admin,
      nombre,
      direccion,
      categoria,
      capacidad,
      estado
    } = req.body;

    // Crea un nuevo restaurante
    const restaurante = new Restaurante({
      id_admin,
      nombre,
      direccion,
      categoria,
      capacidad,
      estado
    });

    const resultado = await restaurante.save();

    res.status(201).json({
      message: 'Restaurante creado con éxito',
      restaurante: resultado
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getRestauranteById(req, res) {
    try {
      const restauranteId = req.params.id; 
  
      const restaurante = await Restaurante.findById(restauranteId);
  
      if (!restaurante || restaurante.estado !== true) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
  
      res.status(200).json(restaurante);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export async function getRestaurantesByCategoriaNombre(req, res) {
    try {
      const { categoria, nombre } = req.query;
      const condiciones = {};
  
      if (categoria) {
        condiciones.categoria = categoria;
      }
      if (nombre) {
        condiciones.nombre = nombre;
      }
      condiciones.estado = true;
      const restaurantes = await Restaurante.find(condiciones);
  
      res.status(200).json(restaurantes);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  
export async function updateRestauranteById(req, res) {
    try {
      const restauranteId = req.params.id; 
      // const restauranteData = req.body;

      const restauranteData = {
        id_admin,
        nombre,
        direccion,
        categoria,
        capacidad,
        estado
      } = req.body;
  
      const restaurante = await Restaurante.findByIdAndUpdate(restauranteId, restauranteData, { new: true });
   
      if (!restaurante || restaurante.estado !== true) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
  
      res.status(200).json(restaurante);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  
export async function disableRestauranteById(req, res) {
    try {
      const restauranteId = req.params.id;
  
      const restaurante = await Restaurante.findById(restauranteId);
  
      if (!restaurante) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
  
      restaurante.estado = false;
      await restaurante.save();
  
      res.status(200).json({ message: 'Restaurante inhabilitado con éxito' });
    } catch (err) {
      res.status(500).json(err);
    }
  }