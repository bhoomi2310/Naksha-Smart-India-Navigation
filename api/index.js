import app from '../server/server.js';
import { initDatabase } from '../server/db.js';

let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    try {
      await initDatabase();
      initialized = true;
    } catch (e) {
      console.error('Failed to init DB in serverless handler:', e);
    }
  }

  return app(req, res);
}
