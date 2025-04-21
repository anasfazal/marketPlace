import cluster from 'cluster';
import os from 'os';
import https from 'https';
import fs from 'fs';
import app from './app.js';
import db from './config/db.js';

const numCPUs = os.cpus().length;
console.log(`Number of CPUs: ${numCPUs}`);
const PORT = process.env.PORT || 443;


const sslOptions = {
  key: fs.readFileSync('ecdsa.key'),
  cert: fs.readFileSync('ecdsa.crt'),
};

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking ${numCPUs} worker(s)...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {

  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Worker ${process.pid} - HTTPS Server running at https://localhost:${PORT}`);

  });
}
