const Configuration = require('../models/configuration');
// tạo cấu hình mới
exports.createConfiguration = async (req, res) => {
  try {
    const { defaultPages, permittedFileTypes, pageGrantDates, pricePerPage } = req.body;

    // Kiểm tra tham số đầu vào
    if (defaultPages && (typeof defaultPages !== 'number' || defaultPages < 0)) {
      return res.status(400).json({ message: 'defaultPages must be a positive number' });
    }

    if (permittedFileTypes && !Array.isArray(permittedFileTypes)) {
      return res.status(400).json({ message: 'permittedFileTypes must be an array of strings' });
    }

    if (pageGrantDates && !Array.isArray(pageGrantDates)) {
      return res.status(400).json({ message: 'pageGrantDates must be an array of valid date strings' });
    }

    if (pricePerPage && (typeof pricePerPage !== 'number' || pricePerPage < 0)) {
      return res.status(400).json({ message: 'pricePerPage must be a positive number' });
    }

    // Kiểm tra các ngày cấp trang có phải là dạng ngày hợp lệ
    if (pageGrantDates) {
      const invalidDates = pageGrantDates.filter(date => isNaN(new Date(date).getTime()));
      if (invalidDates.length > 0) {
        return res.status(400).json({ message: 'Some pageGrantDates are invalid' });
      }
    }

    // Tạo cấu hình mới
    const newConfiguration = new Configuration({
      defaultPages,
      permittedFileTypes,
      pageGrantDates,
      pricePerPage
    });

    await newConfiguration.save();
    res.status(201).json({ message: 'Configuration created successfully', configuration: newConfiguration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// lấy cấu hình hiện tại
exports.getConfiguration = async (req, res) => {
    try {
      const configuration = await Configuration.findOne();
      if (!configuration) {
        return res.status(404).json({ message: 'Configuration not found' });
      }
      res.status(200).json(configuration);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

// cập nhật cấu hình hiện tại
exports.updateConfiguration = async (req, res) => {
  try {
    const { defaultPages, permittedFileTypes, pageGrantDates } = req.body;

    // Kiểm tra xem `defaultPages` có phải là số dương không
    if (defaultPages && (typeof defaultPages !== 'number' || defaultPages <= 0)) {
      return res.status(400).json({ message: 'defaultPages must be a positive number' });
    }

    // Kiểm tra `permittedFileTypes` là một mảng và chứa các chuỗi
    if (permittedFileTypes && (!Array.isArray(permittedFileTypes) || !permittedFileTypes.every(type => typeof type === 'string'))) {
      return res.status(400).json({ message: 'permittedFileTypes must be an array of strings' });
    }

    // Kiểm tra `pageGrantDates` có phải là một mảng các ngày hợp lệ
    if (pageGrantDates && (!Array.isArray(pageGrantDates) || !pageGrantDates.every(date => !isNaN(new Date(date).getTime())))) {
      return res.status(400).json({ message: 'pageGrantDates must be an array of valid date strings' });
    }

    // Cập nhật cấu hình
    const updatedConfiguration = await Configuration.findOneAndUpdate(
      {}, // Không cần điều kiện vì chỉ có một cấu hình duy nhất
      { defaultPages, permittedFileTypes, pageGrantDates },
      { new: true } // Trả về bản ghi đã được cập nhật
    );

    if (!updatedConfiguration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }

    res.status(200).json({ message: 'Configuration updated successfully', configuration: updatedConfiguration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// xóa cấu hình hiện tại
exports.deleteConfiguration = async (req, res) => {
    try {
      const deletedConfiguration = await Configuration.deleteMany({}); // Xóa tất cả cấu hình
  
      // Kiểm tra nếu không có cấu hình nào bị xóa
      if (deletedConfiguration.deletedCount === 0) {
        return res.status(404).json({ message: 'No configuration found to delete' });
      }
  
      res.status(200).json({ message: 'Configuration deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  