const { createUserService, loginService } = require('../services/userService');

const createUser = async (req, res) => {
    console.log(req.body);
    const { name, MSSV, faculty, birthdate, email, phoneNumber, password, repassword } = req.body;

    // Kiểm tra nếu password khác với repassword
    const data = await createUserService(name, MSSV, faculty, birthdate, email, phoneNumber, password, repassword);
    // Tiếp tục xử lý nếu password và repassword khớp
    return res.status(200).json(data);
}

const handleLogin = async (req, res) => {
    const   { username, password } = req.body;
    const data = await loginService(username, password);
    return res.status(200).json(data); 
}


module.exports = {
    createUser, handleLogin
}