const Transaction = require('../models/transaction');
const Student = require('../models/student');
// Tạo giao dịch mới 
exports.createTransaction = async (req, res) => {
    try {
      const { _id, studentId, amount, pageAmount, paymentMethod, payOSId } = req.body;
  

      // Kiểm tra _id của giao dịch có bị trùng không
      const existingTransactionById = await Transaction.findById(_id);
      if (existingTransactionById) {
        return res.status(400).json({ message: 'Transaction with this _id already exists.' });
      }

      // Kiểm tra định dạng studentId
      if (!studentId || !/^\d{7}$/.test(studentId)) {
        return res.status(400).json({ error: "Student ID must be a 7-digit number." });
      }
  
      const currentYear = new Date().getFullYear();
      const firstTwoDigits = parseInt(studentId.slice(0, 2), 10);
      if (firstTwoDigits > currentYear % 100) {
        return res.status(400).json({ error: "The first two digits of the Student ID must represent a year less than the current year." });
      }
  
  
      // Kiểm tra studentId có tồn tại trong hệ thống không
      const studentExists = await Student.findById(studentId);
      if (!studentExists) {
        return res.status(404).json({ message: 'Student with this studentId does not exist.' });
      }
  
      // Kiểm tra mã giao dịch từ hệ thống thanh toán có bị trùng không
      const existingTransaction = await Transaction.findOne({ payOSId });
      if (existingTransaction) {
        return res.status(400).json({ message: 'Transaction with this payOSId already exists.' });
      }
  
      // Kiểm tra số tiền hợp lệ (ví dụ: > 0)
      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0.' });
      }
  
      // Kiểm tra số trang hợp lệ (ví dụ: > 0)
      if (pageAmount <= 0) {
        return res.status(400).json({ message: 'Page amount must be greater than 0.' });
      }
  
      // Kiểm tra phương thức thanh toán hợp lệ
      // const validPaymentMethods = ['BKPay', 'CreditCard', 'Momo'];
      // if (!validPaymentMethods.includes(paymentMethod)) {
      //   return res.status(400).json({ message: `Invalid payment method. Supported methods: ${validPaymentMethods.join(', ')}` });
      // }
  
      // Tạo giao dịch mới
      const newTransaction = new Transaction({
        _id,
        studentId,
        amount,
        pageAmount,
        paymentMethod,
        payOSId,
      });
  
      await newTransaction.save();
      res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };


  // lấy toàn bộ thông tin giao dịch
  exports.getAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find().populate('studentId', 'name email'); // Liên kết thông tin sinh viên
      if (transactions.length === 0) {
        return res.status(404).json({ message: 'No transactions found' });
      }
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };


// lấy thông tin giao dịch theo id của transaction
exports.getTransactionById = async (req, res) => {
    try {
      const { id } = req.params; // Lấy id giao dịch từ URL
  
      const transaction = await Transaction.findById(id).populate('studentId', 'name email');
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

// lấy thông tin giao dịch theo MSSV của sinh viên
exports.getTransactionsByStudentId = async (req, res) => {
    try {
      const { studentId } = req.params; // Lấy MSSV từ URL
  
      // Kiểm tra studentId có tồn tại trong bảng Student không
      const studentExists = await Student.findById(studentId);
      if (!studentExists) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Truy vấn tất cả giao dịch của sinh viên với MSSV được cung cấp, không trả trường studentId
      const transactions = await Transaction.find({ studentId }, '-studentId'); // Loại bỏ studentId
      if (transactions.length === 0) {
        return res.status(404).json({ message: 'No transactions found for this student' });
      }
  
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

// Cập nhật giao dịch vs id transaction
exports.updateTransaction = async (req, res) => {
    try {
      const { id } = req.params; // Lấy id giao dịch từ URL
      const { amount, pageAmount, paymentMethod, status } = req.body;
  
      // Kiểm tra các tham số đầu vào
      const updates = {}; // Chứa các trường cần cập nhật
  
      if (amount) {
        if (typeof amount !== 'number' || amount <= 0) {
          return res.status(400).json({ message: 'Amount must be a positive number' });
        }
        updates.amount = amount;
      }
  
      if (pageAmount) {
        if (typeof pageAmount !== 'number' || pageAmount <= 0) {
          return res.status(400).json({ message: 'Page amount must be a positive number' });
        }
        updates.pageAmount = pageAmount;
      }
  
      if (paymentMethod) {
        if (typeof paymentMethod !== 'string' || !['BKPay', 'Other'].includes(paymentMethod)) {
          return res.status(400).json({ message: 'Invalid payment method' });
        }
        updates.paymentMethod = paymentMethod;
      }
  
      if (status) {
        if (!['PENDING', 'PAID', 'FAILED'].includes(status)) {
          return res.status(400).json({ message: 'Invalid status value' });
        }
        updates.status = status;
      }
  
      // Nếu không có trường nào được cung cấp để cập nhật
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No valid fields to update' });
      }
  
      // Cập nhật giao dịch
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        updates,
        { new: true } // Trả về bản ghi đã được cập nhật
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
// Rồi giờ mà trạng thái giao dịch là paid rồi á thì thêm trang in cho sinh viên liền ngay và luôn
exports.addPrintingPages = async (req, res) => {
  try {
    const { transactionId } = req.params;
    // Kiểm tra transactionId không hợp lệ
    if (!transactionId || typeof transactionId !== 'string' || transactionId.trim() === '') {
      return res.status(400).json({ message: 'Invalid transaction ID format' });
    }

    // Tìm giao dịch với ID cung cấp và trạng thái là PAID
    const transaction = await Transaction.findOne({ _id: transactionId, status: 'PAID' });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found or not successful' });
    }

    // Tìm sinh viên dựa trên studentId từ giao dịch
    const student = await Student.findById(transaction.studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Cập nhật số trang in của sinh viên
    student.pageBalance += transaction.pageAmount;
    await student.save();

    res.status(200).json({
      message: 'Printing pages added successfully',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        pageBalance: student.pageBalance,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



// Xóa giao dịch theo transaction id
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id giao dịch từ URL

    // Tìm giao dịch theo ID
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Kiểm tra trạng thái giao dịch
    if (transaction.status === 'PAID' || transaction.status === 'FAILED') {
      return res.status(400).json({ message: 'Cannot delete a transaction that has already been paid or failed' });
    }

    // Xóa giao dịch nếu trạng thái là PENDING
    await transaction.deleteOne();

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};