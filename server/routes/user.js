const router = require('express').Router();
const {createUser, handleLogin} = require('../controllers/userController');

router.post('/register', createUser);
router.post('/login', handleLogin);


module.exports = router;