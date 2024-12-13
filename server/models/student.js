const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id:        { type: String, required: true },              // MSSV
    name:       { type: String, required: true },              // Name
    email:      { type: String, required: true, unique: true },// Email
    password:   { type: String, required: true },              // Password
    pageBalance:{ type: Number, default: 0 },                  // Số trang in còn lại
    refreshToken: { type: String, default: '' },               // Refresh token
}, { timestamps: true });   

studentSchema.index({ name: 1 });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;