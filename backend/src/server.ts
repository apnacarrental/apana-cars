import dotenv from 'dotenv';
import path from 'path';

// Force dotenv to load the parent .env to resolve all secrets cleanly
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback

if (!process.env.BACKEND_JWT_SECRET) {
  console.error('FATAL: BACKEND_JWT_SECRET environment variable is missing.');
  process.exit(1);
}

import app from './app';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
