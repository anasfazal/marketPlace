import queries from '../config/queries.js';  // Adjust the path to point to the correct location
import bcrypt from 'bcrypt';
import db from '../config/db.js';  


const seedDatabase = async () => {
  try {
    await db.query(queries.createUsersTable);
    await db.query(queries.createProductsTable);
    await db.query(queries.createCartsTable);

    // seed admin
    const [existingAdmins] = await db.query('SELECT * FROM users WHERE role = ?', ['admin']);

    if (existingAdmins.length === 0) {
      const hashedPassword = await bcrypt.hash('Admin123', 10);
      await db.query(queries.insertUser, [
        'Admin',
        'admin@admin.com',
        hashedPassword,
        'Admin',
        30
      ]);
      console.log('Default admin created.');
    } else {
      console.log('Admin already exists.');
    }

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seedDatabase();
