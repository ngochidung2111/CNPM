const payOSRouter = require('./payOS');

const initRoutes = (app) => {
    app.use('/api/payOS', payOSRouter);
}

module.exports = initRoutes;