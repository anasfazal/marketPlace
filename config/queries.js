const queries = {
    // Users table
    createUsersTable: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role ENUM('admin', 'seller', 'customer'),
        age INT,
        INDEX(email)
      )
    `,
  
    // Products table
    createProductsTable: `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price DECIMAL(10, 2),
        seller_id INT,
        FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX(seller_id)
      )
    `,
  
    // Carts table
    createCartsTable: `
      CREATE TABLE IF NOT EXISTS carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT,
        product_id INT,
        quantity INT,
        FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX(customer_id),
        INDEX(product_id)
      )
    `,
  
    // ------------------ User Queries ------------------
    insertUser: `
      INSERT INTO users (name, email, password, role, age)
      VALUES (?, ?, ?, ?, ?)
    `,
  
    getUserByEmail: `
      SELECT * FROM users WHERE email = ?
    `,
  
    getUserById: `
      SELECT * FROM users WHERE id = ?
    `,
  
    updateUser: `
      UPDATE users SET name = ?, email = ?, password = ?, role = ?, age = ? WHERE id = ?
    `,
  
    deleteUser: `
      DELETE FROM users WHERE id = ?
    `,
  
    // ------------------ Product Queries ------------------
    addProduct: `
      INSERT INTO products (name, description, price, seller_id)
      VALUES (?, ?, ?, ?)
    `,
  
    getAllProducts: `
      SELECT id, name, description, price, seller_id AS sellerId FROM products
    `,
  
    getProductById: `
      SELECT id, name, description, price, seller_id AS sellerId FROM products WHERE id = ?
    `,
  
    updateProduct: `
      UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?
    `,
  
    deleteProduct: `
      DELETE FROM products WHERE id = ?
    `,
  
    // ------------------ Cart Queries ------------------
    addToCart: `
      INSERT INTO carts (customer_id, product_id, quantity)
      VALUES (?, ?, ?)
    `,
  
    removeFromCart: `
      DELETE FROM carts WHERE customer_id = ? AND product_id = ?
    `,
  
    getCartByCustomerId: `
      SELECT * FROM carts WHERE customer_id = ?
    `,
  
    updateCartQuantity: `
      UPDATE carts SET quantity = ? WHERE customer_id = ? AND product_id = ?
    `
  };
  
  export default queries;
  