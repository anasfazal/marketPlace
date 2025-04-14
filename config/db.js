import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qwerty@123',
  database: 'marketplace',
});

console.log('Connected to MySQL database');

export default db;
