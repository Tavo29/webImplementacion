import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// Registro de proveedor
export const registerProvider = [
  body('name').notEmpty().withMessage('Nombre requerido'),
  body('email').isEmail().withMessage('Email debe se valido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña de minimo 6 caracteres'),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingProvider = await pool.query('SELECT * FROM Providers WHERE email = $1', [email]);
      if (existingProvider.rows.length > 0) {
        return res.status(400).json({ msg: 'Proveedor ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newProvider = await pool.query(
        'INSERT INTO Providers (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );

      const token = jwt.sign({ id: newProvider.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error registrando proveedor:', err);
      res.status(500).send('Server error');
    }
  }
];

// Registro de cliente
export const registerClient = [
  body('name').notEmpty().withMessage('Nombre requerido'),
  body('email').isEmail().withMessage('Email debe ser valido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña de minimo 6 caracteres'),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingClient = await pool.query('SELECT * FROM Clients WHERE email = $1', [email]);
      if (existingClient.rows.length > 0) {
        return res.status(400).json({ msg: 'Cliente ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newClient = await pool.query(
        'INSERT INTO Clients (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );

      const token = jwt.sign({ id: newClient.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error regustrando cliente:', err);
      res.status(500).send('Server error');
    }
  }
];
