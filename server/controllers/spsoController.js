const bcrypt = require('bcryptjs');
const SPSO = require('../models/spso'); 
const PrinterInfo = require('../models/printerInfo');
// Tạo mới nhân viên SPSO 
exports.createSPSO = async (req, res) => {
  try {
    const { _id, name, email, password, permissions } = req.body; // Lấy dữ liệu từ body của yêu cầu

    // Kiểm tra định dạng email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Kiểm tra mật khẩu có ít nhất 8 ký tự, chứa chữ cái, số và ký tự đặc biệt
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain a letter, a number, and a special character.',
      });
    }

    // Kiểm tra xem _id đã tồn tại chưa
    const existingId = await SPSO.findById(_id);
    if (existingId) {
      return res.status(400).json({ message: 'ID already exists' });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingSPSO = await SPSO.findOne({ email });
    if (existingSPSO) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng lặp salt

    // Tạo mới SPSO
    const newSPSO = new SPSO({
      _id,
      name,
      email,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa
      permissions,
    });

    // Lưu vào cơ sở dữ liệu
    await newSPSO.save();
    res.status(201).json({ message: 'SPSO created successfully', 
        // newSPSO 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Lấy thông tin tất cả SPSO
exports.getAllSPSOs = async (req, res) => {
    try {
      const spsos = await SPSO.find().select('-password'); // Lấy tất cả nhân viên SPSO và loại bỏ password
      if (spsos.length === 0) {
        return res.status(404).json({ message: 'No SPSOs found' });
      }
      res.status(200).json(spsos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  

// Lấy SPSO theo ID
exports.getSPSOById = async (req, res) => {
    try {
      const { id } = req.params;  // Lấy id từ URL
  
      const spso = await SPSO.findById(id).select('-password'); // Lấy SPSO theo ID và loại bỏ password
      if (!spso) {
        return res.status(404).json({ message: 'SPSO not found' });
      }
  
      res.status(200).json(spso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
// Cập nhật SPSO theo ID
const validator = require('validator');
exports.updateSPSO = async (req, res) => {
  try {
    const { id } = req.params;  // Lấy id từ URL
    const { name, email, password, permissions } = req.body;  // Lấy thông tin từ body

    // Kiểm tra xem email có trùng với email đã tồn tại không
    if (email) {
      const existingSPSO = await SPSO.findOne({ email });
      if (existingSPSO && existingSPSO._id !== id) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    // Kiểm tra định dạng email hợp lệ
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Kiểm tra mật khẩu
    if (password && (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password))) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long, contain letters, numbers, and special characters' });
    }

    // Mã hóa mật khẩu nếu có trường password
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Tạo đối tượng cập nhật (chỉ cập nhật những trường có trong body)
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (hashedPassword) updateData.password = hashedPassword;
    if (permissions) updateData.permissions = permissions;

    // Cập nhật thông tin SPSO
    const updatedSPSO = await SPSO.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSPSO) {
      return res.status(404).json({ message: 'SPSO not found' });
    }

    res.status(200).json({ message: 'SPSO updated successfully', 
        // updatedSPSO 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Xóa SPSO theo ID
exports.deleteSPSO = async (req, res) => {
    try {
      const { id } = req.params;  // Lấy id từ URL
  
      // Tìm và xóa SPSO theo ID
      const deletedSPSO = await SPSO.findByIdAndDelete(id);
      if (!deletedSPSO) {
        return res.status(404).json({ message: 'SPSO not found' });
      }
  
      res.status(200).json({ message: 'SPSO deleted successfully',
        //  deletedSPSO 
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  

  // Bật/Tắt máy in
exports.togglePrinterStatus = async (req, res) => {
    try {
      const { printerId } = req.params; // Lấy printerId từ URL
  
      // Tìm máy in theo printerId
      const printer = await PrinterInfo.findOne({ printerId });
      if (!printer) {
        return res.status(404).json({ message: 'Printer not found' });
      }
  
      // Đảo ngược trạng thái của máy in (bật <-> tắt)
      printer.isEnabled = !printer.isEnabled;
  
      // Lưu lại trạng thái mới
      await printer.save();
  
      res.status(200).json({ message: `Printer status changed to ${printer.isEnabled ? 'ON' : 'OFF'}`, 
        // printer
     });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };