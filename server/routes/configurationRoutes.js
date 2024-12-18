const express = require('express');
const router = express.Router();
const configurationtController = require('../controllers/configurationController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Route: Tạo cấu hình mới
router.post('/',[verifyAccessToken, isAdmin], configurationtController.createConfiguration);

// Route: Lấy thông tin cấu hình
router.get('/',verifyAccessToken, configurationtController.getConfiguration);

// Route: Cập nhật cấu hình hiện tại
router.put('/',[verifyAccessToken, isAdmin], configurationtController.updateConfiguration);

// Route: Xóa cấu hình hiện tại
router.delete('/',[verifyAccessToken, isAdmin], configurationtController.deleteConfiguration);

module.exports = router;