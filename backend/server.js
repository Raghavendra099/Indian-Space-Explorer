/**
 * Indian Space Explorer — Express Server
 * Main entry point for the Node.js backend
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// ─── API Routes ───────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ─── Serve index.html for all non-API routes (SPA fallback) ──────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ─── Start Server with graceful port fallback ─────────────────────────────────
function startServerWithFallback(startPort, maxAttempts = 10) {
  let port = Number(startPort) || 3000;
  let attempts = 0;

  const tryListen = () => {
    const server = app.listen(port, () => {
      console.log(`\n🚀 Indian Space Explorer is live!`);
      console.log(`   → Local:  http://localhost:${port}`);
      console.log(`   → API:    http://localhost:${port}/api/missions\n`);
    });

    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        attempts += 1;
        if (attempts >= maxAttempts) {
          console.error(`Port ${port} is in use and max retries reached (${maxAttempts}).`);
          console.error('Please stop the process using the port or set the PORT env variable to a free port.');
          process.exit(1);
        }
        console.warn(`Port ${port} in use, trying port ${port + 1}... (${attempts}/${maxAttempts})`);
        port += 1;
        setTimeout(tryListen, 200);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  };

  try {
    connectDB()
      .then(() => tryListen())
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
      });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

startServerWithFallback(PORT);
