// server/routes/orders.js
import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// POST /api/orders — save cart checkout
router.post('/', async (req, res) => {
  const { items, total, whatsapp_msg, customer_info } = req.body;

  if (!items || !total) {
    return res.status(400).json({ error: 'items and total are required' });
  }

  try {
    const { rows } = await pool.query(`
      INSERT INTO orders (items_json, total, whatsapp_msg, customer_info)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `, [
      JSON.stringify(items),
      total,
      whatsapp_msg || null,
      JSON.stringify(customer_info || {})
    ]);

    console.log(`🛒 New order #${rows[0].id} — ${total} درهم`);
    res.status(201).json({ success: true, order_id: rows[0].id, created_at: rows[0].created_at });
  } catch (err) {
    console.error('POST /api/orders error:', err.message);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// GET /api/orders — list all orders (admin use)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, items_json, total, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 100
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
