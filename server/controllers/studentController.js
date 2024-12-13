// controllers/studentController.js
const Student = require('../models/student');
const bcrypt = require('bcryptjs');
// them sinh vien
// Thêm sinh viên mới
exports.createStudent = async (req, res) => {
  try {
    const { _id, name, email, password, pageBalance } = req.body;

    // Kiểm tra định dạng _id
    if (!_id || !/^\d{7}$/.test(_id)) {
      return res.status(400).json({ error: "Student ID must be a 7-digit number." });
    }

    const currentYear = new Date().getFullYear();
    const firstTwoDigits = parseInt(_id.slice(0, 2), 10);
    if (firstTwoDigits > currentYear % 100) {
      return res.status(400).json({ error: "The first two digits of the Student ID must represent a year less than the current year." });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Kiểm tra độ mạnh của mật khẩu
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and include letters, numbers, and special characters.",
      });
    }

    // Kiểm tra xem _id đã tồn tại trong cơ sở dữ liệu chưa
    const existingStudent = await Student.findOne({ _id });
    if (existingStudent) {
      return res.status(400).json({ error: "Student ID already exists." });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists." });
    }


    // Hash mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10); 
    // Nếu các kiểm tra đều hợp lệ, tạo sinh viên mới
    const newStudent = new Student({
      _id,
      name,
      email,
      password: hashedPassword,
      pageBalance: pageBalance || 0, // Nếu không cung cấp, mặc định là 0
    });

    await newStudent.save();

    // Trả về thông tin sinh viên đã tạo thành công
    res.status(201).json({
      message: "Student account created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

// Lấy thông tin sinh viên
exports.getStudent = async (req, res) => {
    try {
      const studentId = req.params.id; // Lấy _id từ URL params
  
      // Kiểm tra định dạng _id (phải là chuỗi 7 chữ số)
      if (!/^\d{7}$/.test(studentId)) {
        return res.status(400).json({ error: "Invalid Student ID format. Must be a 7-digit string." });
      }
      

      const currentYear = new Date().getFullYear();
      const firstTwoDigits = parseInt(studentId.slice(0, 2), 10);
      if (firstTwoDigits > currentYear % 100) {
       return res.status(400).json({ error: "The first two digits of the Student ID must represent a year less than the current year." });
      }

      // Tìm sinh viên theo _id
      const student = await Student.findOne({ _id: studentId }); // Dùng _id từ schema
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      // Loại bỏ password trước khi trả về
      const studentData = student.toObject();
      delete studentData.password;


      // Trả về thông tin sinh viên
      res.status(200).json(studentData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  


// Cập nhật thông tin sinh viên
exports.updateStudent = async (req, res) => {
    try {
      const { _id,email, ...updateData } = req.body; // Tách studentId khỏi các trường khác
  
      // Nếu có `studentId` trong body, trả về lỗi
      if (_id) {
        return res.status(400).json({ 
          error: "Cannot update studentId. This field is not editable." 
        });
      }
  
       // Nếu có `email` trong body, trả về lỗi
       if (email) {
        return res.status(400).json({ 
          error: "Cannot update email. This field is not editable." 
        });
      }

      // Kiểm tra định dạng _id trong params
      const studentIdFromParams = req.params.id;
      if (!/^\d{7}$/.test(studentIdFromParams)) {
        return res.status(400).json({ error: "Invalid Student ID format. Must be a 7-digit string." });
      }
  
      // Tìm và cập nhật thông tin sinh viên
      const updatedStudent = await Student.findOneAndUpdate(
        { _id: studentIdFromParams }, // Xác định sinh viên cần cập nhật theo _id
        updateData, // Chỉ cập nhật các trường cho phép
        { new: true, runValidators: true } // Trả về document đã cập nhật và chạy trình kiểm tra
      );
  
      // Kiểm tra nếu không tìm thấy sinh viên
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      // Trả về thông tin đã cập nhật
      res.status(200).json({
        message: "Student information updated successfully",
        // student: updatedStudent,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  

// Xóa sinh viên
exports.deleteStudent = async (req, res) => {
    try {
      const studentIdFromParams = req.params.id;
        
      // Kiểm tra định dạng _id (7 chữ số)
      if (!/^\d{7}$/.test(studentIdFromParams)) {
        return res.status(400).json({ error: "Invalid Student ID format. Must be a 7-digit string." });
      }

      const currentYear = new Date().getFullYear();
      const firstTwoDigits = parseInt(studentIdFromParams.slice(0, 2), 10);
      if (firstTwoDigits > currentYear % 100) {
       return res.status(400).json({ error: "The first two digits of the Student ID must represent a year less than the current year." });
      }

  
      // Tìm và xóa sinh viên
      const deletedStudent = await Student.findByIdAndDelete(studentIdFromParams);
  
      // Kiểm tra nếu không tìm thấy sinh viên
      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      // Trả về thông báo xóa thành công
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  