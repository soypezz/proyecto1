import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Creacion del app
const app = express();
const port = process.env.PORT || 4040;


const mongoURI = 'mongodb+srv://@cluster0.zfp0qp8.mongodb.net/comercial'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas.');
  })
  .catch((err) => {
    console.log('There was an error with the connection to MongoDB Atlas.');
    console.error(err);
  });

  
// Middlewares
app.use(cors());
app.use(express.json());

import usuariosRoutes from './usuarios/usuarios.routes.js'
import restaurantesRoutes from './restaurantes/restaurantes.routes.js'
import productosRoutes from './productos/productos.routes.js'

app.use('/usuarios', usuariosRoutes);
app.use('/restaurantes', restaurantesRoutes);
app.use('/productos', productosRoutes);

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
  });
