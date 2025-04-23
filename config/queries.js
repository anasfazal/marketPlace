export const queries = {
    createUsersTable: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'seller', 'customer') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
  
    insertUser: `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)`,
  
    getUserByEmail: `
      SELECT id, name, email, role, password 
      FROM users 
      WHERE email = ?`,
  
    getUserById: `
      SELECT id, name, email, role, created_at 
      FROM users 
      WHERE id = ?`,
  
    getAllUsers: `
      SELECT id, name, email, role, created_at 
      FROM users`,
  
    updateUser: `
      UPDATE users 
      SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        password = COALESCE(?, password),
        role = COALESCE(?, role)
      WHERE id = ?`,
  
    deleteUser: `
      DELETE FROM users 
      WHERE id = ?`,
  
    createProductsTable: `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        seller_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_seller (seller_id)
      )`,
  
    insertProduct: `
      INSERT INTO products (name, description, price, seller_id)
      VALUES (?, ?, ?, ?)`,
  
    selectAllProducts: `
      SELECT 
        p.id, p.name, p.description, p.price, 
        u.id AS seller_id, u.name AS seller_name
      FROM products p
      JOIN users u ON p.seller_id = u.id`,
  
    selectProductById: `
      SELECT 
        p.id, p.name, p.description, p.price,
        u.id AS seller_id, u.name AS seller_name
      FROM products p
      JOIN users u ON p.seller_id = u.id
      WHERE p.id = ?`,
  
    updateProduct: `
      UPDATE products 
      SET name = ?, description = ?, price = ?
      WHERE id = ? AND seller_id = ?`,
  
    deleteProduct: `
      DELETE FROM products 
      WHERE id = ? AND seller_id = ?`,
  
    createCartsTable: `
      CREATE TABLE IF NOT EXISTS carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user (user_id)
      )`,
  
    createCartItemsTable: `
      CREATE TABLE IF NOT EXISTS cart_items (
        cart_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        PRIMARY KEY (cart_id, product_id),
        FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_cart_product (cart_id, product_id)
      )`,
  
    createCart: `
      INSERT INTO carts (user_id)
      VALUES (?)`,
  
    getCartByUserId: `
      SELECT id 
      FROM carts 
      WHERE user_id = ?`,
  
    addToCart: `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
  
    getCartDetails: `
      SELECT 
        c.id AS cart_id,
        p.id AS product_id,
        p.name,
        p.price,
        ci.quantity,
        (p.price * ci.quantity) AS total
      FROM carts c
      JOIN cart_items ci ON c.id = ci.cart_id
      JOIN products p ON ci.product_id = p.id
      WHERE c.user_id = ?`,
  
    removeFromCart: `
      DELETE FROM cart_items
      WHERE cart_id = ? AND product_id = ?`,
  
    updateCartItem: `
      UPDATE cart_items
      SET quantity = ?
      WHERE cart_id = ? AND product_id = ?`,
  
    clearCart: `
      DELETE FROM cart_items
      WHERE cart_id = ?`
  };


export default queries;