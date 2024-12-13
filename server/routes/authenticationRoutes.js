const routes = require('express').Router();
const authenticationController = require('../controllers/authenticationController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

routes.post('/login', authenticationController.login);
routes.get('/getCurrent', verifyAccessToken, authenticationController.getCurrent);

module.exports = routes;