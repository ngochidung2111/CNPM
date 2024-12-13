const router = require('express').Router();
const payOScontroller = require('../services/payOSservice');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createPayment', verifyAccessToken, payOScontroller.createPayment);
router.get('/checkPaymentStatus/:transactionCode', verifyAccessToken, payOScontroller.checkPaymentStatus);

module.exports = router;