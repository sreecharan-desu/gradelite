const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    branch: String,
    year: String,
    sem: String,
    gpa: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Result || mongoose.model('Result', resultSchema);
