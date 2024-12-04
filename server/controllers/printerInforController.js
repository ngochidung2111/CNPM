const Printer = require('../models/printerInfo');
// cho admin
// Thêm máy in
exports.addPrinter = async (req, res) => {
  try {
    const { printerId, brand, model, description, location, isEnabled } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!printerId || !brand || !model || !location || !location.campus || !location.building || !location.room) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Kiểm tra định dạng dữ liệu (ví dụ, printerId phải là chuỗi)
    if (typeof printerId !== 'string' || typeof brand !== 'string' || typeof model !== 'string') {
      return res.status(400).json({ error: 'Invalid data types.' });
    }

    // Kiểm tra tính hợp lệ của trường location (khu vực, tòa nhà, phòng)
    if (typeof location.campus !== 'string' || typeof location.building !== 'string' || typeof location.room !== 'string') {
      return res.status(400).json({ error: 'Invalid location format.' });
    }

    // Kiểm tra isEnabled có phải là boolean không
    if (isEnabled !== undefined && typeof isEnabled !== 'boolean') {
      return res.status(400).json({ error: 'isEnabled must be a boolean.' });
    }

    // Kiểm tra xem printerId đã tồn tại trong cơ sở dữ liệu chưa
    const existingPrinter = await Printer.findOne({ printerId });
    if (existingPrinter) {
      return res.status(400).json({ error: 'Printer ID already exists.' });
    }

    // Tạo một đối tượng mới từ dữ liệu
    const newPrinter = new Printer({
      printerId,
      brand,
      model,
      description: description || '',
      location,
      isEnabled: isEnabled !== undefined ? isEnabled : true,  // Nếu không cung cấp, mặc định là true
    });

    // Lưu máy in vào cơ sở dữ liệu
    await newPrinter.save();

    // Trả về thông tin máy in đã được tạo
    res.status(201).json({
      message: "Printer added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Lấy danh sách tất cả máy in
exports.getAllPrinters = async (req, res) => {
  try {
    const printers = await Printer.find();
    // Kiểm tra nếu không có máy in nào
    if (printers.length === 0) {
      return res.status(404).json({ error: "No printers found" });
    }
    // Trả về danh sách máy in
    res.status(200).json(printers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin máy in theo printerId
exports.getPrinterById = async (req, res) => {
  try {
    const { printerId } = req.params; // Lấy printerId từ URL params

    // Tìm máy in theo printerId
    const printer = await Printer.findOne({ printerId });

    if (!printer) {
      return res.status(404).json({ error: "Printer not found" });
    }

    // Trả về thông tin máy in
    res.status(200).json(printer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Cập nhật máy in

exports.updatePrinter = async (req, res) => {
  try {
    const { printerId } = req.params;  // Lấy printerId từ URL params

    // Kiểm tra xem có truyền printerId trong request body không và nếu có, trả về lỗi
    if (req.body.printerId) {
      return res.status(400).json({ error: 'Cannot update printerId.' });
    }

    // Kiểm tra các trường bắt buộc khi có trong request body
    const { brand, model, location, isEnabled, description } = req.body;

    // Kiểm tra nếu có trường brand thì phải là chuỗi
    if (req.body.hasOwnProperty('brand') && typeof brand !== 'string') {
      return res.status(400).json({ error: 'Invalid data type for brand.' });
    }

    // Kiểm tra nếu có trường model thì phải là chuỗi
    if (req.body.hasOwnProperty('model') && typeof model !== 'string') {
      return res.status(400).json({ error: 'Invalid data type for model.' });
    }

    // Kiểm tra nếu có trường location thì phải là một object hợp lệ
    if (req.body.hasOwnProperty('location')) {
      if (typeof location !== 'object' || !location.campus || !location.building || !location.room) {
        return res.status(400).json({ error: 'Invalid location format or missing fields.' });
      }
    }

    // Kiểm tra nếu có trường isEnabled thì phải là boolean
    if (req.body.hasOwnProperty('isEnabled') && typeof isEnabled !== 'boolean') {
      return res.status(400).json({ error: 'isEnabled must be a boolean.' });
    }

    // Kiểm tra nếu có trường description thì phải là chuỗi
    if (req.body.hasOwnProperty('description') && typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid data type for description.' });
    }

    // Tìm máy in theo printerId và cập nhật
    const updatedPrinter = await Printer.findOneAndUpdate({ printerId: printerId }, req.body, { new: true });

    // Kiểm tra nếu không tìm thấy máy in
    if (!updatedPrinter) {
      return res.status(404).json({ error: "Printer not found" });
    }

    // Trả về máy in đã được cập nhật
    res.status(200).json(updatedPrinter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



  

// Xóa máy in
// Xóa máy in
exports.deletePrinter = async (req, res) => {
  try {
    const { printerId } = req.params;  // Lấy printerId từ params (URL)

    // Tìm và xóa máy in dựa trên printerId
    const deletedPrinter = await Printer.findOneAndDelete({ printerId });

    // Kiểm tra nếu không tìm thấy máy in
    if (!deletedPrinter) {
      return res.status(404).json({ message: 'Printer not found' });
    }

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Printer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

