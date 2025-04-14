const queries = {
    createTable: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        age INT
      )
    `,
    insertUser: `INSERT INTO users (name, age) VALUES (?, ?)`,
    insertMultipleUsers: `INSERT INTO users (name, age) VALUES ?`,
    getAllUsers: `SELECT * FROM users`,
    getUserById: `SELECT * FROM users WHERE id = ?`,
    updateUser: `UPDATE users SET name = ?, age = ? WHERE id = ?`,
    deleteUser: `DELETE FROM users WHERE id = ?`,
  };
  
  export default queries;