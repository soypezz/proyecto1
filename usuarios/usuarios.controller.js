import Usuario from './usuarios.model.js';

export async function getUser(req,res) {

    const users = await Usuario.find(req.query);
  
    res.status(200).json(users);
  }


  export async function createUser(req, res) {
    try {
      const { correo_electronico, 
        nombre, contraseña, telefono, direccion,rol } = req.body;
  
      const user = new Usuario({
        correo_electronico,
        nombre,
        contraseña,
        telefono,
        direccion,
        rol
      });
  
      const resultado = await user.save();
  
      res.status(201).json({ message: 'Usuario creado con éxito', usuario: resultado });
    } catch (err) {
      res.status(500).json(err);
    }

  }
    

export async function login(req, res) {
    try {
        const { correo_electronico, contraseña } = req.body;
        const user = await Usuario.findOne({ correo_electronico });
        if (!user || user.estado !== true) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user.contraseña !== contraseña) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: user });
    } catch (err) {
        res.status(500).json(err);
    }
}


export async function updateUser(req, res) {
    try {
      const userId = req.params.id;
      // const newData = req.body; 
      const newData = {
        correo_electronico,
        nombre,
        contraseña,
        telefono,
        direccion,
        rol
      };
      const user = await Usuario.findById(userId);
  
      if (!user || user.estado !== true) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      Object.assign(user, newData);
      await user.save();
  
      res.status(200).json({ message: 'Datos de usuario actualizados', usuario: user });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  
export async function disableUserById(req, res) {
    try {
      const userId = req.params.id; 
      const user = await Usuario.findByIdAndUpdate(userId, {estado: false});
  
      if (!user || user.estado !== true) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // await user.remove();
  
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
      res.status(500).json(err);
    }
  }