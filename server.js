const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Ensure the path is correct

dotenv.config();

const app = express(); // Initialize Express before using it

app.use(express.json()); // Middleware to parse JSON

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Use routes AFTER initializing 'app'
app.use('/api/auth', authRoutes); // This must be placed after 'app' is declared

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
