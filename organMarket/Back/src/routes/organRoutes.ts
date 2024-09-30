import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import pool from '../db';

const router = Router();

// Crear un nuevo órgano
router.post('/organs', authenticateJWT, async (req, res) => {
  const { type, description, price, provider_id } = req.body;

  try {
    const newOrgan = await pool.query(
      'INSERT INTO Organs (type, description, price, provider_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, description, price, provider_id]
    );
    res.json(newOrgan.rows[0]);
  } catch (err) {
    console.error('Error al crear el órgano:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todos los órganos
router.get('/organs', authenticateJWT, async (req, res) => {
  try {
    const organs = await pool.query('SELECT * FROM Organs');
    res.json(organs.rows);
  } catch (err) {
    console.error('Error al obtener los órganos:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener un órgano por ID
router.get('/organs/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const organ = await pool.query('SELECT * FROM Organs WHERE id = $1', [id]);

    if (organ.rows.length === 0) {
      return res.status(404).json({ msg: 'Órgano no encontrado' });
    }

    res.json(organ.rows[0]);
  } catch (err) {
    console.error('Error al obtener el órgano:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar un órgano
router.put('/organs/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { type, description, price, status } = req.body;

  try {
    const updatedOrgan = await pool.query(
      'UPDATE Organs SET type = $1, description = $2, price = $3, status = $4 WHERE id = $5 RETURNING *',
      [type, description, price, status, id]
    );

    if (updatedOrgan.rows.length === 0) {
      return res.status(404).json({ msg: 'Órgano no encontrado' });
    }

    res.json(updatedOrgan.rows[0]);
  } catch (err) {
    console.error('Error al actualizar el órgano:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar un órgano
router.delete('/organs/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrgan = await pool.query('DELETE FROM Organs WHERE id = $1 RETURNING *', [id]);

    if (deletedOrgan.rows.length === 0) {
      return res.status(404).json({ msg: 'Órgano no encontrado' });
    }

    res.json({ msg: 'Órgano eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el órgano:', err);
    res.status(500).send('Error en el servidor');
  }
});

export default router;
