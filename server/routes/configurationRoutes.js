const express = require('express');
const router = express.Router();
const configurationtController = require('../controllers/configurationController');

// Route: Tạo cấu hình mới
router.post('/', configurationtController.createConfiguration);

// Route: Lấy thông tin cấu hình
router.get('/', configurationtController.getConfiguration);

// Route: Cập nhật cấu hình hiện tại
router.put('/', configurationtController.updateConfiguration);

// Route: Xóa cấu hình hiện tại
router.delete('/', configurationtController.deleteConfiguration);

module.exports = router;