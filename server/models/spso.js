const mongoose = require('mongoose');

const spsoSchema = new mongoose.Schema({
    _id:         { type: String, required: true },// Mã nhân viên
    name:        { type: String, required: true },
    email:       { type: String, required: true, unique: true },
    password:    { type: String, required: true },
    permissions: { type: [String], default: [] }, // Quyền của nhân viên
    refreshToken: { type: String, default: '' },               // Refresh token
}, { timestamps: true });

const SPSO = mongoose.model('SPSO', spsoSchema);
module.exports = SPSO;
