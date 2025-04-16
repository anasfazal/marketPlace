import https from 'https';
import fs from 'fs';
import app from './app.js';
import db from './config/db.js';

const PORT = process.env.PORT || 443;

const sslOptions = {
  key: fs.readFileSync('ecdsa.key'),
  cert: fs.readFileSync('ecdsa.crt'),
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server running at https://localhost:${PORT}`);
});
