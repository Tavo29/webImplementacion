import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import pool from '../db';

const router = Router();

// Crear un servicio de relocalización
router.post('/relocation', authenticateJWT, async (req, res) => {
  const { client_id, organ_id, risk_level } = req.body;

  try {
    const organ = await pool.query('SELECT * FROM Organs WHERE id = $1', [organ_id]);

    if (organ.rows.length === 0) {
      return res.status(404).json({ msg: 'Órgano no encontrado' });
    }

    const newRelocation = await pool.query(
      'INSERT INTO relocation (client_id, organ_id, risk_level) VALUES ($1, $2, $3) RETURNING *',
      [client_id, organ_id, risk_level]
    );

    res.json(newRelocation.rows[0]);
  } catch (err) {
    console.error('Error al crear el servicio de relocalización:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener servicios de relocalización por cliente
router.get('/relocation/client/:client_id', authenticateJWT, async (req, res) => {
    const { client_id } = req.params;
  
    try {
      const relocations = await pool.query('SELECT * FROM relocation WHERE client_id = $1', [client_id]);
  
      if (relocations.rows.length === 0) {
        return res.status(404).json({ msg: 'No se encontraron servicios de relocalización para este cliente' });
      }
  
      res.json(relocations.rows);
    } catch (err) {
      console.error('Error al obtener los servicios de relocalización:', err);
      res.status(500).send('Error en el servidor');
    }
  });
  
  // Obtener servicios de relocalización por órgano
  router.get('/relocation/organ/:organ_id', authenticateJWT, async (req, res) => {
    const { organ_id } = req.params;
  
    try {
      const relocations = await pool.query('SELECT * FROM relocation WHERE organ_id = $1', [organ_id]);
  
      if (relocations.rows.length === 0) {
        return res.status(404).json({ msg: 'No se encontraron servicios de relocalización para este órgano' });
      }
  
      res.json(relocations.rows);
    } catch (err) {
      console.error('Error al obtener los servicios de relocalización:', err);
      res.status(500).send('Error en el servidor');
    }
  });
  
// Eliminar un servicio de relocalización
router.delete('/relocation/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedRelocation = await pool.query('DELETE FROM relocation WHERE id = $1 RETURNING *', [id]);
  
      if (deletedRelocation.rows.length === 0) {
        return res.status(404).json({ msg: 'Servicio de relocalización no encontrado' });
      }
  
      res.json({ msg: 'Servicio de relocalización eliminado exitosamente' });
    } catch (err) {
      console.error('Error al eliminar el servicio de relocalización:', err);
      res.status(500).send('Error en el servidor');
    }
  });
  
  export default router;
  
  
