// server/routes/requests.js
import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// POST /api/requests — save custom bird request from jadid.html form
router.post('/', async (req, res) => {
  const { bird_name, phone, notes } = req.body;

  if (!bird_name || !phone) {
    return res.status(400).json({ error: 'bird_name and phone are required' });
  }

  try {
    const { rows } = await pool.query(`
      INSERT INTO custom_requests (bird_name, phone, notes)
      VALUES ($1, $2, $3)
      RETURNING id, created_at
    `, [bird_name, phone, notes || null]);

    console.log(`🐦 New custom request #${rows[0].id} — "${bird_name}" from ${phone}`);
    res.status(201).json({ success: true, request_id: rows[0].id });
  } catch (err) {
    console.error('POST /api/requests error:', err.message);
    res.status(500).json({ error: 'Failed to save request' });
  }
});

// GET /api/requests — list all custom requests (admin use)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, bird_name, phone, notes, created_at
      FROM custom_requests
      ORDER BY created_at DESC
      LIMIT 100
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

export default router;
