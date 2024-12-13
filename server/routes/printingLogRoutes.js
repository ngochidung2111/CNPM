const express = require('express');
const router = express.Router();
const printJobController = require('../controllers/printingLogController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Tạo công việc in mới
router.post('/', verifyAccessToken, printJobController.createPrintingLog);

// Lấy tất cả công việc in
router.get('/', [verifyAccessToken, isAdmin], printJobController.getAllPrintingLog);

// Lấy tất cả công việc in có lọc theo ngày
router.get('/date', [verifyAccessToken, isAdmin], printJobController.getAllPrintingLogByDate);

// Lấy công việc in theo ID
router.get('/:id', verifyAccessToken, printJobController.getPrintingLogById);

// Lấy công việc in theo ID và lọc theo khoảng thời gian
router.get('/date/:id/', verifyAccessToken, printJobController.getPrintingLogByStudentIdAndDate);

// Cập nhật công việc in
router.put('/:id', [verifyAccessToken, isAdmin], printJobController.updatePrintingLog);

// Xóa công việc in
router.delete('/:id', [verifyAccessToken, isAdmin], printJobController.deletePrintingLog);

module.exports = router;