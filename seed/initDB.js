import db from '../config/db.js';
import queries from '../config/queries.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    // Create tables
    await db.query(queries.createUsersTable);
    await db.query(queries.createProductsTable);
    await db.query(queries.createCartsTable);
    await db.query(queries.createCartItemsTable);

    // Create default admin
    const [existingAdmin] = await db.query(queries.getUserByEmail, ['admin@admin.com']);
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin123', 10);
      await db.query(queries.insertUser, [
        'Admin User',
        'admin@admin.com',
        hashedPassword,
        'admin'
      ]);
      console.log('Default admin created');
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDatabase();