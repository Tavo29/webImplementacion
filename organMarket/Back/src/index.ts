import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import organRoutes from './routes/organRoutes';
import qualityRoutes from './routes/qualityRoutes';
import relocationRoutes from './routes/relocationRoutes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // Middleware para manejar JSON

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de CRUD para órganos
app.use('/api', organRoutes);

// Rutas de verificación de calidad
app.use('/api', qualityRoutes);

// Rutas para servicios de relocalización
app.use('/api', relocationRoutes);  // Registrar las rutas de relocalización

app.get('/', (req, res) => {
  res.send('Organ market platform is running');
});

if (process.env.NODE_ENV !== 'test') {  // Iniciar el servidor solo si no estamos en modo test
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;  // Exportamos el servidor Express
