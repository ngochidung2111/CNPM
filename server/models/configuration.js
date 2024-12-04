const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    defaultPages:       { type: Number, default: 100 },     // Số trang mặc định mỗi học kỳ
    permittedFileTypes: { type: [String], default: ['pdf', 'doc', 'docx'] }, // Loại file được phép
    pageGrantDates:     { type: [Date] },                   // Ngày cấp trang mặc định
}, { timestamps: true });

module.exports = mongoose.model('Configuration', configurationSchema);
