import 'dotenv/config';
import pool from './db.js';

async function run() {
  const client = await pool.connect();
  try {
    console.log('🔌 Connected to Neon PostgreSQL...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key   TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
    console.log('✅ Table `settings` created or already exists.');
    
    // Insert default GSheet URL if not exists
    const DEFAULT_GSHEET = 'https://script.google.com/macros/s/AKfycbyz4vKuA8Is25GCKCtWvB1SDoBlGd3Qyp-2ucm6lxnbKovrvfTmIHmywDROaB8gG0BG/exec';
    await client.query(`
      INSERT INTO settings (key, value)
      VALUES ('gsheet_webhook_url', $1)
      ON CONFLICT (key) DO NOTHING;
    `, [DEFAULT_GSHEET]);
    console.log('✅ Default settings initialized.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
