const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    type:   { type: String, required: true }, // "monthly" hoặc "yearly"
    year:   { type: Number, required: true },
    month:  { type: Number },                // Chỉ cần khi báo cáo theo tháng
    data:   { type: Object, required: true }, // Nội dung báo cáo (tuỳ biến)
}, { timestamps: true });

// Thêm index
reportSchema.index({ type: 1 });
reportSchema.index({ year: 1, month: 1 }); // Kết hợp năm và tháng

module.exports = mongoose.model('Report', reportSchema);
