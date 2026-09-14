// server/routes/leads.js
import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// POST /api/leads — save WhatsApp CTA signup
router.post('/', async (req, res) => {
  const { phone, source = 'cta' } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'phone is required' });
  }

  try {
    const { rows } = await pool.query(`
      INSERT INTO leads (phone, source)
      VALUES ($1, $2)
      RETURNING id, created_at
    `, [phone, source]);

    console.log(`📱 New lead #${rows[0].id} — ${phone}`);
    res.status(201).json({ success: true, lead_id: rows[0].id });
  } catch (err) {
    console.error('POST /api/leads error:', err.message);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

// GET /api/leads — list all leads (admin use)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, phone, source, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 100
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

export default router;
