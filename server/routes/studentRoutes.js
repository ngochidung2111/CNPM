const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Route: Tạo mới sinh viên
router.post('/', studentController.createStudent);

// Route: Lấy thông tin sinh viên theo ID
router.get('/:id', verifyAccessToken, studentController.getStudent);

// Route: Cập nhật thông tin sinh viên
router.put('/:id', verifyAccessToken, studentController.updateStudent);

// Route: Xóa sinh viên theo ID
router.delete('/:id', [verifyAccessToken, isAdmin], studentController.deleteStudent);

module.exports = router;