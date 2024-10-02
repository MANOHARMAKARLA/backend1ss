const express = require('express');
const connectDB = require('./config/db'); // Database connection setup
const authRoutes = require('./routes/authRoutes'); // Routes for authentication
const recipeRoutes = require('./routes/recipe'); 
const purchaseRoutes = require('./routes/purchase')// Import recipe routes
const dotenv = require('dotenv'); // For loading environment variables
const { requestLogger, responseLogger } = require('./log/logger'); // Import logger
const { verifyToken } = require('./controllers/authMiddleware'); // Middleware for JWT authentication
const ingredient = require('./routes/ingredientRoutes'); // Import the routes
dotenv.config(); // Load variables from .env file
const setupSwagger = require('./swagger');
connectDB(); // Connect to MongoDB
const path = require('path');
const app = express();
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON request bodies
setupSwagger(app);
// Use logging middlewares
app.use(requestLogger); // Log request information
app.use(responseLogger); // Log response information

// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.use('/Auth', authRoutes); // Auth routes
app.use('/', ingredient);
app.use('/', purchaseRoutes);
app.use('/', recipeRoutes);
// Server port
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
