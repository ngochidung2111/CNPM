const express = require('express');
const { addPrinter, getAllPrinters,getPrinterById, updatePrinter, deletePrinter } = require('../controllers/printerInfoController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');


const router = express.Router();

router.post('/', [verifyAccessToken, isAdmin], addPrinter);
router.get('/', verifyAccessToken, getAllPrinters);
router.get('/:printerId', verifyAccessToken,getPrinterById);
router.put('/:printerId', [verifyAccessToken, isAdmin], updatePrinter);
router.delete('/:printerId', [verifyAccessToken, isAdmin], deletePrinter);

module.exports = router;