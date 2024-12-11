const routes = require('express').Router();
const authenticationController = require('../controllers/authenticationController');

routes.post('/login', authenticationController.login);

module.exports = routes;