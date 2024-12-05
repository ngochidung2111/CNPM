const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route: Tạo mới transaction
router.post('/', transactionController.createTransaction);


// Route: Lấy tất cả thông tin giao dịch
router.get('/', transactionController.getAllTransactions);


// Route: Lấy thông tin giao dịch theo id transaction
router.get('/:id', transactionController.getTransactionById);

// Route: Lấy thông tin giao dịch theo MSSV
router.get('/student/:studentId', transactionController.getTransactionsByStudentId);

// Route: Cập nhật thông tin giao dịch theo id
router.put('/:id', transactionController.updateTransaction);

// Route: Cập nhật số trang in cho sinh viên nếu thanh toán thành công ngay và luôn
router.put('/addpage/:transactionId', transactionController.addPrintingPages);

// Route: Xóa thông tin giao dịch theo ID
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
