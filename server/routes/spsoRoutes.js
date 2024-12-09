const express = require('express');
const router = express.Router();
const spsoController = require('../controllers/spsoController');

// Route: Tạo mới spso
router.post('/', spsoController.createSPSO);

// Route: Lấy thông tin spso
router.get('/', spsoController.getAllSPSOs);

// Route: lấy thông tin spso theo id
router.get('/:id', spsoController.getSPSOById);


// Route: Cập nhật thông tin spso theo id
router.put('/:id', spsoController.updateSPSO);

// Route: Xóa spso theo ID
router.delete('/:id', spsoController.deleteSPSO);

// Bật/ tắt máy in
router.put('/status/:printerId', spsoController.togglePrinterStatus);

module.exports = router;