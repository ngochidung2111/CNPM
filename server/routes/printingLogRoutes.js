const express = require('express');
const router = express.Router();
const printJobController = require('../controllers/printingLogController');

// Tạo công việc in mới
router.post('/', printJobController.createPrintingLog);

// Lấy tất cả công việc in
router.get('/', printJobController.getAllPrintingLog);

// Lấy tất cả công việc in có lọc theo ngày
router.get('/date', printJobController.getAllPrintingLogByDate);

// Lấy công việc in theo ID
router.get('/:id', printJobController.getPrintingLogById);

// Lấy công việc in theo ID và lọc theo khoảng thời gian
router.get('/date/:id/', printJobController.getPrintingLogByStudentIdAndDate);

// Cập nhật công việc in
router.put('/:id', printJobController.updatePrintingLog);

// Xóa công việc in
router.delete('/:id', printJobController.deletePrintingLog);

module.exports = router;