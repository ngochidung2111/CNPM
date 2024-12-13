const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id:        { type: String, required: true },                          // Mã giao dịch (Transaction ID)
    studentId:  { type: String, ref: 'Student', required: true },    // MSSV của sinh viên
    amount:     { type: Number, required: true },                       // Số tiền giao dịch
    pageAmount: { type: Number, required: true },                   // Số trang cộng thêm vào tài khoản
    paymentMethod: { type: String, default: 'BKPay' },              // Phương thức thanh toán
    status:     { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' }, // Trạng thái giao dịch
    payOSId:    { type: String, unique: true, required: true },        // Mã giao dịch từ PayOS
}, { timestamps: true });

// Tạo index
transactionSchema.index({ studentId: 1 });
transactionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
