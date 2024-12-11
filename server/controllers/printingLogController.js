const PrintJob = require('../models/PrintingLog');
const Printer = require('../models/printerInfo');  // Import model Printer
const Configuration = require('../models/configuration');
const Student = require('../models/student');
// Thêm công việc in ấn mới
exports.createPrintingLog = async (req, res) => {
  try {
    const { studentId, printerId, fileName, paperSize, pages, copies, isDoubleSided, paperUsage } = req.body;

    // Kiểm tra sự tồn tại của studentId trong DB
    const student = await Student.findOne({ _id: studentId });  // Tìm sinh viên theo studentId (là _id trong Student)
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Kiểm tra sự tồn tại của printerId trong DB
    const printer = await Printer.findOne({ printerId });
    if (!printer) {
      return res.status(404).json({ error: 'Printer not found' });
    }

    // Kiểm tra tính hợp lệ của file name
      // Lấy cấu hình từ DB
    const filenameValid = fileName && fileName.trim().length > 0;
    if (!filenameValid) {
      return res.status(400).json({ error: 'File name is required' });
    }

    //Kiểm tra file type có nằm trong permittedFileTypes không
    const config = await Configuration.findOne();
    if (!config) {
      return res.status(500).json({ error: 'Configuration not found' });
    }
    
    if (!config.permittedFileTypes.includes(fileName.split('.').pop())){
      return res.status(400).json({ error: 'File type is not permitted' });
    }

    // Kiểm tra tính hợp lệ của paperUsage (nếu có)
    const paperUsageValid = paperUsage && (typeof paperUsage.A4 === 'number' && typeof paperUsage.A3 === 'number');
    if (!paperUsageValid) {
      return res.status(400).json({ error: 'Invalid paper usage format.' });
    }

    // Kiểm tra tính hợp lệ của các thuộc tính in (properties)
    const properties = {
      paperSize: paperSize || 'A4',  // Mặc định là A4 nếu không có
      pages: pages || 1,  // Mặc định là 1 trang nếu không có
      copies: copies || 1,  // Mặc định là 1 bản sao nếu không có
      isDoubleSided: isDoubleSided || false,  // Mặc định là không in hai mặt nếu không có
    };

    // Tạo công việc in mới
    const newPrintJob = new PrintJob({
      studentId,
      printerId,
      fileName,
      startTime: Date.now(), // Ghi lại thời gian bắt đầu
      paperUsage: paperUsage || { A4: 0, A3: 0 }, // Nếu không có, mặc định là không có giấy
      properties,
      status: 'Pending'  // Mặc định trạng thái là "Pending"
    });

    // Lưu công việc in vào cơ sở dữ liệu
    await newPrintJob.save();

    student.pageBalance -= copies*(paperUsage.A4 + 2*paperUsage.A3);  // Trừ số trang in từ số trang còn lại của sinh viên
    await student.save();  // Lưu thông tin sinh viên sau khi trừ số trang in

    // Trả về thông báo thành công
    res.status(201).json({
      message: 'Print job created successfully',
      // printJob: newPrintJob,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  

// Xem lịch sử in ấn nè
  // Lấy thông tin tất cả công việc in (printing logs)
exports.getAllPrintingLog = async (req, res) => {
  try {
    // Lấy tất cả công việc in và populate thông tin sinh viên
    const printJobs = await PrintJob.find()
      .populate({
        path: 'studentId',
        select: 'name email'  // Chỉ lấy thông tin name và email của sinh viên
      })
      .select('fileName startTime endTime status paperUsage properties printerId');  // Lấy thêm cả trường printerId

    // Nếu không có công việc in nào
    if (printJobs.length === 0) {
      return res.status(404).json({ message: 'No print jobs found' });
    }

    // Trả về kết quả
    res.status(200).json(printJobs);
  } catch (error) {
    console.error(error);  // In ra lỗi nếu có
    res.status(500).json({ error: error.message });
  }
};


// Lấy thông tin tất cả công việc in (printing logs) có lọc thời gian theo đề
exports.getAllPrintingLogByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;  // Lấy startDate và endDate từ query parameters

    // Xây dựng đối tượng truy vấn
    let query = {};

    // Thêm điều kiện lọc theo khoảng thời gian nếu có
    if (startDate && endDate) {
      query.startTime = {
        $gte: new Date(startDate), // Ngày bắt đầu
        $lte: new Date(endDate),   // Ngày kết thúc
      };
    }

    // Lấy tất cả công việc in và populate thông tin sinh viên
    const printJobs = await PrintJob.find(query)
      .populate({
        path: 'studentId',
        select: 'name email'  // Chỉ lấy thông tin name và email của sinh viên
      })
      .select('fileName startTime endTime status paperUsage properties printerId');  // Lấy thêm cả trường printerId

    // Nếu không có công việc in nào
    if (printJobs.length === 0) {
      return res.status(404).json({ message: 'No print jobs found for the given period' });
    }

    // Trả về kết quả
    res.status(200).json(printJobs);
  } catch (error) {
    console.error(error);  // In ra lỗi nếu có
    res.status(500).json({ error: error.message });
  }
};


  
 // Lấy thông tin công việc in theo ID PrintingLog
exports.getPrintingLogById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params trong URL

    // Tìm công việc in theo ID
    const printJob = await PrintJob.findById(id)
      .populate({
        path: 'studentId',
        select: 'name email' // Chỉ lấy thông tin name và email của sinh viên
      });

    // Nếu không tìm thấy công việc in
    if (!printJob) {
      return res.status(404).json({ message: 'Print job not found' });
    }

    // Trả về thông tin công việc in
    res.status(200).json(printJob);
  } catch (error) {
    console.error(error);  // In ra lỗi nếu có
    res.status(500).json({ error: error.message });
  }
};

// này cho sinh viên nó lấy thông tin của nó in 

// Lấy thông tin công việc in của sinh viên trong khoảng thời gian cụ thể và tóm tắt số trang in theo từng khổ giấy
exports.getPrintingLogByStudentIdAndDate = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id sinh viên từ URL
    const { startDate, endDate } = req.query; // Lấy startDate và endDate từ query parameters

    // Xây dựng đối tượng truy vấn
    let query = { studentId: id };

    // Thêm điều kiện lọc theo khoảng thời gian nếu có
    if (startDate && endDate) {
      query.startTime = {
        $gte: new Date(startDate), // Ngày bắt đầu
        $lte: new Date(endDate),   // Ngày kết thúc
      };
    }

    // Tìm các công việc in của sinh viên trong khoảng thời gian và theo id sinh viên
    const printJobs = await PrintJob.find(query)
      .populate({
        path: 'studentId',
        select: 'name email' // Chỉ lấy thông tin name và email của sinh viên
      })
      // .populate('printerId'); // Nếu cần thông tin máy in cũng có thể populate

    // Nếu không có công việc in nào
    if (!printJobs || printJobs.length === 0) {
      return res.status(404).json({ message: 'No print jobs found for this student in the given period' });
    }

    // Tính tổng số trang theo từng loại giấy (A4, A3)
    const totalPages = printJobs.reduce((acc, job) => {
      acc.A4 += job.paperUsage.A4 || 0;
      acc.A3 += job.paperUsage.A3 || 0;
      return acc;
    }, { A4: 0, A3: 0 });

    // Trả về thông tin công việc in và tóm tắt số trang in
    res.status(200).json({ printJobs, totalPages });
  } catch (error) {
    console.error(error); // In ra lỗi nếu có
    res.status(500).json({ error: error.message });
  }
};




  
// Cập nhật công việc in ấn
exports.updatePrintingLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName, paperUsage, properties, status } = req.body;

    // Lấy công việc in cần cập nhật
    const printJob = await PrintJob.findById(id);
    if (!printJob) {
      return res.status(404).json({ error: 'Print job not found' });
    }

    // Kiểm tra tính hợp lệ của file name
    // Lấy cấu hình từ DB
    const filenameValid = fileName && fileName.trim().length > 0;
    if (!filenameValid) {
      return res.status(400).json({ error: 'File name is required' });
    }

    //Kiểm tra file type có nằm trong permittedFileTypes không
    const config = await Configuration.findOne();
    if (!config) {
      return res.status(500).json({ error: 'Configuration not found' });
    }
    if (config.permittedFileTypes.includes(fileName.split('.').pop())){
      return res.status(400).json({ error: 'File type is not permitted' });
    }

    // Không cho phép sửa studentId và printerId
    // Nếu có thay đổi thì trả lỗi
    if (req.body.studentId || req.body.printerId) {
      return res.status(400).json({ error: 'Cannot update studentId or printerId' });
    }

    // Cập nhật các trường hợp khác
    printJob.fileName = fileName || printJob.fileName;
    printJob.paperUsage = paperUsage || printJob.paperUsage;
    printJob.properties = properties || printJob.properties;
    printJob.status = status || printJob.status;

    // Lưu công việc in sau khi cập nhật
    await printJob.save();

    // Trả về kết quả sau khi cập nhật thành công
    res.status(200).json({
      message: 'Print job updated successfully',
      // printJob,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  



// Hàm xóa công việc in theo ID
exports.deletePrintingLog = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra sự tồn tại của công việc in trong DB
    const printJob = await PrintJob.findById(id);
    if (!printJob) {
      return res.status(404).json({ error: 'Print job not found' });
    }

    // Kiểm tra trạng thái công việc in, không cho phép xóa nếu đã hoàn thành hoặc bị hủy
    if (printJob.status === 'Completed' || printJob.status === 'Canceled') {
      return res.status(400).json({ error: 'Cannot delete a completed or canceled print job' });
    }

    // Xóa công việc in
    await PrintJob.findByIdAndDelete(id);

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Print job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  