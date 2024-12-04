const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
    printerId:  { type: String, required: true, unique: true },
    brand:      { type: String, required: true },
    model:      { type: String, required: true },
    description:{ type: String },
    location: {
        campus:     { type: String, required: true },
        building:   { type: String, required: true },
        room:       { type: String, required: true },
    },
    isEnabled: { type: Boolean, default: true },
}, { timestamps: true });

// Thêm index
printerSchema.index({ 'location.campus': 1 });          // lọc theo khu vực cụ thể
printerSchema.index({ isEnabled: 1 });                     // Để tìm máy in khả dụng.

module.exports = mongoose.model('Printer', printerSchema);
