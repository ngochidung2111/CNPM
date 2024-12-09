const userRoute = require('./user');
const router = require('express').Router();
const auth = require('../middlewares/jwt');

// Áp dụng middleware auth cho tất cả các routes
router.use(auth);

// Định nghĩa các routes
router.use('/user', userRoute);

const initRoutes = (app) => {
    app.use('/api', router);
}

module.exports = initRoutes;