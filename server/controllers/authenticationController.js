// import Student from "../models/student";
// import SPSO from "../models/spso";
const Student = require('../models/student');
const SPSO = require('../models/spso');
const bcrypt = require('bcryptjs');
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt');

//Login
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}


const login = async (req, res) => {
    const { id, password, role } = req.body;
    if( !id || !password ) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    try {
        if(role === 'Student') {
            const response = await Student.findOne({ _id: id });
            if(response && await comparePassword(password, response.password)) {
                const { password, ...userData } = response.toObject();
                const accessToken = generateAccessToken(response._id, role);
                // Tạo refreshToken moi
                const newRefreshToken = generateRefreshToken(response._id);
                // Lưu refreshToken vào database
                await Student.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
                // Lưu refreshToken vào cookie thời gian hết hạn 7 ngày 
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 2*24*60*60*1000 }); 
                return res.status(200).json({
                    success: true,
                    accessToken,
                    userData
                })
            } else {
                throw new Error('Invalid credentials');
            }
        } else if(role === 'SPSO') {
            const response = await SPSO.findOne({ _id: id });
            if(response && await comparePassword(password, response.password)) {
                const { password, ...userData } = response.toObject();
                const accessToken = generateAccessToken(response._id, role);
                // Tạo refreshToken moi
                const newRefreshToken = generateRefreshToken(response._id);
                // Lưu refreshToken vào database
                await SPSO.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
                // Lưu refreshToken vào cookie thời gian hết hạn 7 ngày 
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 2*24*60*60*1000 }); 
                return res.status(200).json({
                    success: true,
                    accessToken,
                    userData
                })
            } else {
                throw new Error('Invalid credentials');
            }
        } else {
            throw new Error('Invalid role');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { login };