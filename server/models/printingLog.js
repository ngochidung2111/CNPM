const mongoose = require('mongoose');

const printingLogSchema = new mongoose.Schema({
    studentId:  { type: String, ref: 'Student', required: true }, // Mã số sinh viên
    printerId:  { type: String, ref: 'Printer', required: true }, // Mã máy in
    fileName:   { type: String, required: true },
    startTime:  { type: Date, default: Date.now },
    endTime:    { type: Date },
    paperUsage: {                                 // Lượng giấy in
        A4: { type: Number, default: 0 },
        A3: { type: Number, default: 0 },
    },
    properties: {                                  // Thuộc tính in
        paperSize:{ type: String, required: true },// A4 hoặc A3
        pages:    { type: Number, required: true },// Tổng số trang in
        copies:   { type: Number, required: true },
        isDoubleSided: { type: Boolean, default: false },
    },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Canceled'], default: 'Pending' },

}, { timestamps: true });

// Thêm index
printingLogSchema.index({ studentId: 1 });
printingLogSchema.index({ printerId: 1 });
printingLogSchema.index({ startTime: -1 });        // Thời gian mới nhất trước
printingLogSchema.index({ endTime: -1 });
printingLogSchema.index({ studentId: 1, printerId: 1 }); // Chỉ mục kết hợp nếu tìm theo sinh viên và máy in thường xuyên
printingLogSchema.index({ status: 1 });

module.exports = mongoose.model('PrintingLog', printingLogSchema);
