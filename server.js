const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema
const resultSchema = new mongoose.Schema({
    branch: String,
    year: String,
    sem: String,
    gpa: Number,
    timestamp: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);

// Routes
app.post('/api/submit', async (req, res) => {
    try {
        const { branch, year, sem, gpa } = req.body;
        
        if (!branch || !year || !sem || gpa === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newResult = new Result({
            branch,
            year,
            sem,
            gpa
        });

        await newResult.save();
        res.status(201).json({ message: 'Result saved successfully', id: newResult._id });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
