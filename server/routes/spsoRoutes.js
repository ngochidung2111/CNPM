const express = require('express');
const router = express.Router();
const spsoController = require('../controllers/spsoController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Route: Tạo mới spso
router.post('/', [verifyAccessToken, isAdmin], spsoController.createSPSO);

// Route: Lấy thông tin spso
router.get('/', [verifyAccessToken, isAdmin], spsoController.getAllSPSOs);

// Route: lấy thông tin spso theo id
router.get('/:id', [verifyAccessToken, isAdmin], spsoController.getSPSOById);


// Route: Cập nhật thông tin spso theo id
router.put('/:id', [verifyAccessToken, isAdmin], spsoController.updateSPSO);

// Route: Xóa spso theo ID
router.delete('/:id', [verifyAccessToken, isAdmin], spsoController.deleteSPSO);

// Bật/ tắt máy in
router.put('/status/:printerId', [verifyAccessToken, isAdmin], spsoController.togglePrinterStatus);

module.exports = router;