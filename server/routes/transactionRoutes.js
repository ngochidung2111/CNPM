const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Route: Tạo mới transaction
router.post('/', verifyAccessToken, transactionController.createTransaction);


// Route: Lấy tất cả thông tin giao dịch
router.get('/', [verifyAccessToken, isAdmin], transactionController.getAllTransactions);


// Route: Lấy thông tin giao dịch theo id transaction
router.get('/:id', verifyAccessToken, transactionController.getTransactionById);

// Route: Lấy thông tin giao dịch theo MSSV
router.get('/student/:studentId', verifyAccessToken, transactionController.getTransactionsByStudentId);

// Route: Cập nhật thông tin giao dịch theo id
router.put('/:id', [verifyAccessToken, isAdmin], transactionController.updateTransaction);

// Route: Cập nhật số trang in cho sinh viên nếu thanh toán thành công ngay và luôn
router.post('/addpage/:transactionId', verifyAccessToken, transactionController.addPrintingPages);

// Route: Xóa thông tin giao dịch theo ID
router.delete('/:id', [verifyAccessToken, isAdmin], transactionController.deleteTransaction);

module.exports = router;