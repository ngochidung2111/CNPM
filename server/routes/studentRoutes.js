const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route: Tạo mới sinh viên
router.post('/', studentController.createStudent);

// Route: Lấy thông tin sinh viên theo ID
router.get('/:id', studentController.getStudent);

// Route: Cập nhật thông tin sinh viên
router.put('/:id', studentController.updateStudent);

// Route: Xóa sinh viên theo ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
