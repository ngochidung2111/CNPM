// const payOSRouter = require('./payOS');
const printerRouter = require('./printerInfoRoutes'); // Import printerRoutes
const studentRouter = require('./studentRoutes');
const printJobRouter = require('./printingLogRoutes');
const spsoRouter = require('./spsoRoutes');
const initRoutes = (app) => {
    // app.use('/api/payOS', payOSRouter);
    app.use('/api/printers', printerRouter);
    app.use('/api/students',studentRouter);
    app.use('/api/printingLogs',printJobRouter);
    app.use('/api/spso',spsoRouter);
}

module.exports = initRoutes;