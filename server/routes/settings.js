import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all settings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM settings');
    const settings = {};
    result.rows.forEach(row => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// POST to update settings
router.post('/', async (req, res) => {
  const settings = req.body; // e.g. { fb_pixel: '123', tiktok_pixel: '456' }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const [key, value] of Object.entries(settings)) {
      await client.query(`
        INSERT INTO settings (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `, [key, value]);
    }
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error saving settings:', err);
    res.status(500).json({ error: 'Failed to save settings' });
  } finally {
    client.release();
  }
});

export default router;
