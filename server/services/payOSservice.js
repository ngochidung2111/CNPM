const PayOS = require("@payos/node");
const Student = require('../models/student');
const Transaction = require('../models/transaction');
const asyncHandler = require('express-async-handler');

const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_ID);

const createPayment = asyncHandler(async (req, res) => {
    const { price, payOSCode } = req.body;

    const YOUR_DOMAIN = process.env.CLIENT_URL;
    ordCode = payOSCode;
    const body = {
      transactionCode: ordCode,
      amount: price,
      description: `Thanh toan ${ordCode}`,
      // items: productList,
      returnUrl: `${YOUR_DOMAIN}/payment-result/${ordCode}`,
      cancelUrl: `${YOUR_DOMAIN}/payment-result/${ordCode}`,
    };
  
    try {
      const paymentLinkResponse = await payOS.createPaymentLink(body);
  
      res.json({url: paymentLinkResponse.checkoutUrl});
    } catch (error) {
      console.error(error);
      res.send("Something went error");
    }
});

const checkPaymentStatus = asyncHandler(async (req, res) => {
    const { transactionCode } = req.params;
  
    try {
      const paymentStatusResponse = await payOS.getPaymentLinkInformation(transactionCode);
      if (paymentStatusResponse) {
        const transaction = await Transaction.findOne({
          payOSId: transactionCode,
        });
        
        if (transaction) {
          transaction.status = paymentStatusResponse.status;
            if (transaction.status === "PAID") {
                const student = await Student.findById(transaction.studentId);

                if (student) {
                    student.pageBalance += transaction.pageAmount;
                    await student.save();
                }
            }
        }
      }
  
      res.json({
        success: paymentStatusResponse? true : false,
        paymentData: paymentStatusResponse? paymentStatusResponse : "Cannot get payment status",
      });
    } catch (error) {
      console.error(error);
      res.send("Something went error");
    }
});

const receiveHook = asyncHandler(async (req, res) => {
});

module.exports = { createPayment, receiveHook, checkPaymentStatus };