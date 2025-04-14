import fs from 'fs';
import path from 'path';

const logFile = path.resolve('activity.log');

export const logActivity = (message) => {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFile, entry, (err) => {
    if (err) {
      console.error('Logging Error:', err);
    }
  });
};
