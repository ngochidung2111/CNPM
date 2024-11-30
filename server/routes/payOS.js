const router = require('express').Router();
const payOScontroller = require('../services/payOSservice');

router.post('/createPayment', payOScontroller.createPayment);
router.get('/checkPaymentStatus/:transactionCode', payOScontroller.checkPaymentStatus);

module.exports = router;