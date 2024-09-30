import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import pool from '../db';

const router = Router();

// Registrar la verificación de calidad de un órgano
router.post('/quality-check', authenticateJWT, async (req, res) => {
  const { organ_id, quality, comments } = req.body;

  try {
    const organ = await pool.query('SELECT * FROM Organs WHERE id = $1', [organ_id]);

    if (organ.rows.length === 0) {
      return res.status(404).json({ msg: 'Órgano no encontrado' });
    }

    const newQualityCheck = await pool.query(
      'INSERT INTO organquality (organ_id, quality, comments) VALUES ($1, $2, $3) RETURNING *',
      [organ_id, quality, comments]
    );

    res.json(newQualityCheck.rows[0]);
  } catch (err) {
    console.error('Error al registrar la verificación de calidad:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener los registros de calidad de un órgano
router.get('/quality-checks/:organ_id', authenticateJWT, async (req, res) => {
    const { organ_id } = req.params;
  
    try {
      const qualityChecks = await pool.query('SELECT * FROM organquality WHERE organ_id = $1', [organ_id]);
  
      if (qualityChecks.rows.length === 0) {
        return res.status(404).json({ msg: 'No hay verificaciones de calidad para este órgano' });
      }
  
      res.json(qualityChecks.rows);
    } catch (err) {
      console.error('Error al obtener los registros de calidad:', err);
      res.status(500).send('Error en el servidor');
    }
  });
  
  export default router;
  
