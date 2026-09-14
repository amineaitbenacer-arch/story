// server/routes/birds.js
import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/birds — all birds
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id, name, type, price, old_price, discount,
        image, category, badge, badge_text,
        rating, reviews, desc_ar,
        specs_json    AS specs,
        features_json AS features,
        can_speak, difficulty, color,
        tags_json     AS tags
      FROM birds
      ORDER BY price ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('GET /api/birds error:', err.message);
    res.status(500).json({ error: 'Failed to fetch birds' });
  }
});

// GET /api/birds/:id — single bird
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id, name, type, price, old_price, discount,
        image, category, badge, badge_text,
        rating, reviews, desc_ar,
        specs_json    AS specs,
        features_json AS features,
        can_speak, difficulty, color,
        tags_json     AS tags
      FROM birds WHERE id = $1
    `, [req.params.id]);

    if (!rows.length) return res.status(404).json({ error: 'Bird not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /api/birds/:id error:', err.message);
    res.status(500).json({ error: 'Failed to fetch bird' });
  }
});

export default router;
