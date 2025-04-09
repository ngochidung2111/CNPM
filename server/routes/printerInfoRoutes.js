const express = require('express');
const { addPrinter, getAllPrinters,getPrinterById, updatePrinter, deletePrinter } = require('../controllers/printerInforController');

const router = express.Router();

router.post('/', addPrinter);
router.get('/', getAllPrinters);
router.get('/:printerId',getPrinterById);
router.put('/:printerId', updatePrinter);
router.delete('/:printerId', deletePrinter);

module.exports = router;
