// server/index.js — Express API server for بيبيات الأطلس
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import birdsRouter    from './routes/birds.js';
import ordersRouter   from './routes/orders.js';
import leadsRouter    from './routes/leads.js';
import requestsRouter from './routes/requests.js';
import settingsRouter from './routes/settings.js';

const app  = express();
const PORT = process.env.PORT || 3001;

// ---- MIDDLEWARE ----
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:4173', // Vite preview
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ---- ROUTES ----
app.use('/api/birds',    birdsRouter);
app.use('/api/orders',   ordersRouter);
app.use('/api/leads',    leadsRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/settings', settingsRouter);

// ---- HEALTH CHECK ----
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '🐦 بيبيات الأطلس API is running!',
    timestamp: new Date().toISOString()
  });
});

// ---- 404 ----
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ---- START ----
app.listen(PORT, () => {
  console.log(`\n🚀 بيبيات الأطلس API server running on http://localhost:${PORT}`);
  console.log(`   → Birds:    http://localhost:${PORT}/api/birds`);
  console.log(`   → Orders:   http://localhost:${PORT}/api/orders`);
  console.log(`   → Leads:    http://localhost:${PORT}/api/leads`);
  console.log(`   → Requests: http://localhost:${PORT}/api/requests`);
  console.log(`   → Settings: http://localhost:${PORT}/api/settings`);
  console.log(`   → Health:   http://localhost:${PORT}/api/health\n`);
});
