import app from './app.js';
import db from './config/db.js';

const PORT = process.env.PORT || 5000;

// You don’t need db() — it’s already connected.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
