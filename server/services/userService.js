require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUserService = async (name, MSSV, faculty, birthdate, email, phoneNumber, password, repassword) => {
    try {
        // Kiểm tra nếu password khác với repassword
        if (password !== repassword) {
            return {
                EC: 3, // Error Code 3: Password mismatch
                EM: 'Password và Repassword không khớp'
            };
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return {
                EC: 1, // Error Code 1: User already exists
                EM: 'Email or phone number already exists'
            };
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({
            name: name,
            MSSV: MSSV,
            faculty: faculty,
            birthdate: birthdate,
            email: email,
            phoneNumber: phoneNumber,
            password: hashPassword,
            role: 'student'
        });
        return {
            EC: 0, // Error Code 0: Success
            EM: 'User created successfully',
            data: result
        };
    } catch (error) {
        return {
            EC: 2, // Error Code 2: Server error
            EM: 'An error occurred while creating the user'
        };
    }
        
}

const loginService = async (username, password) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: username },
                { phoneNumber: username }
            ]
        });
        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword){
                return {
                    EC: 2, // Error Code 2: Incorrect password
                    EM: 'Email/Phone number or password is incorrect'
                };
            } else {
                const payload = {
                    id: user._id,
                    role: user.role
                }
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
                return {
                    EC: 0, // Error Code 0: Success
                    EM: 'Login successful',
                    accessToken,
                    user: {
                        name: user.name,
                        MSSV: user.MSSV,
                        faculty: user.faculty,
                        birthdate: user.birthdate,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        role: user.role
                    }
                }
            }
        } else {
            return {
                EC: 1, // Error Code 1: User not found
                EM: 'Email/Phone number or password is incorrect'
            };
        }
    } catch (error) {
        return {
            EC: 3, // Error Code 3: Server error
            EM: 'An error occurred while logging in'
        };
    }
        
}
module.exports = {
    createUserService, loginService
}
