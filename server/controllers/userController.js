const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
// const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
const makeToken = require('uniqid');

// Hàm đăng ký
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, mobile, password } = req.body;
    if(!firstname || !lastname || !email || !mobile || !password) 
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    const user = await User.findOne({email});
    if(user) 
        throw new Error('User already existed!');
    else {
        const token = makeToken();
        const emailEdited = btoa(email) + '@' + token;
        const newUser = await User.create({
            email: emailEdited, password, firstname, lastname, mobile
        })
        if(newUser) {
            const html = `<h2>Mã đăng ký: </h2> <br /><blockquote>${token}</blockquote>`;
            await sendMail({ email, html, subject: 'Xác nhận đăng ký tài khoản trang web ABC' });
        }
        
        setTimeout(async () => { 
            await User.deleteOne({email: emailEdited})
        }, [300000])

        return res.json({
            success: newUser ? true : false,
            mes: newUser ? 'Đã gửi mã xác nhận qua email' : 'Đã có lỗi xảy ra, vui lòng thử lại'
        })
    }
});

const finalRegister = asyncHandler(async (req, res) => { 
    const { token } = req.params;
    const notActiveEmail = await  User.findOne({email: new RegExp(`${token}$`)})
    if(notActiveEmail) {
        notActiveEmail.email = atob(notActiveEmail?.email?.split('@')[0]);
        notActiveEmail.save();
    }
    return res.json({
        success: notActiveEmail ? true : false,
        mes: notActiveEmail ? 'Đã đăng ký thành công, vui lòng đăng nhập' : 'Đã có lỗi xảy ra, vui lòng thử lại'
    })
})

// Refresh token: cấp mới lại access token
// Access token: xác thực người dùng, phân quyền người dùng

// Hàm login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    const response = await User.findOne({ email });
    //console.log(await response.isCorrectPassword(password));
    if(response && await response.isCorrectPassword(password)) {
        // Tách password, refreshToken và role ra khỏi response
        const { password, role, refreshToken, ...userData } = response.toObject();
        // Tạo accessToken
        const accessToken = generateAccessToken(response._id, role);
        // Tạo refreshToken moi
        const newRefreshToken = generateRefreshToken(response._id);
        // Lưu refreshToken vào database
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
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
});
// Hàm lấy thông tin user hiện tại (login và xác thực người dùng)
const getCurrent = asyncHandler(async(req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-password -refreshToken');
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
});
// Hàm refreshAccessToken
const refreshAccessToken = asyncHandler(async(req, res) => {
    // Lấy refreshToken từ cookie
    const cookie = req.cookies;
    // Kiểm tra xem refreshToken có trong cookie không
    if(!cookie && !cookie.refreshToken) {
        throw new Error('No refresh token in cookie');
    }
    // Giải mã refreshToken
    const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findById({_id: result._id, refreshToken: cookie.refreshToken});
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })
})
// Hàm đăng xuất
const logOut = asyncHandler(async(req, res) => {
    const cookie = req.cookies;
    // Kiem tra xem dang nhap chua
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie');
    // Xoa refreshToken trong database  
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, {new: true}); 
    // Xoa refreshToken trong cookie o trinh duyet
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });
    return res.status(200).json({
        success: true,
        mes: 'Logout successfully'
    })
})
// Hàm xóa user [quyền admin]
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error('Missing inputs')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'No user delete'
    })
})
// Hàm cập nhật thông tin user
const updateUser = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})
// Hàm cập nhật thông tin user [quyền admin]
const updateUserByAdmin = asyncHandler(async (req, res) => {
    // 
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})
const forgotPassword = asyncHandler(async(req, res) => {
    const { email } = req.body;
    if(!email) throw new Error('Missing email');
    const user = await User.findOne({ email });
    if(!user) throw new Error('User not found');
    const resetToken = user.createPasswordChangeToken();
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 15 phút kể từ bây giờ.  
    <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click Here</a>`;
    const data = { email: email, html, subject: 'Forgot password' };

    const rs = await sendMail(data);
    return res.status(200).json({
        success: rs.response?.includes('OK') ? true : false,
        mes: rs.response?.includes('OK') ? 'Hãy kiểm tra email của bạn để thay đổi mật khẩu.' : 'Đã có lỗi xảy ra, vui lòng thử lại.'
    });
})
const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    if(!token || !password) throw new Error('Missing token or password');
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({passwordResetToken, passwordResetExpires: { $gt: Date.now() }});
    if(!user) { throw new Error('Token is invalid or has expired'); }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Password reset successfully' : 'Password'
    })
})

// Viết API CRUD cho user

// Hàm lấy thông tin tất cả người dùng [quyền admin]
const getUsers = asyncHandler(async (req, res) => {
    const { page, limit, sortField, sortOrder } = req.query;
    let sort = {};
    sort[sortField] = sortOrder === 'ascend' ? 1 : -1;
    const users = await User.find()
        .sort(sort)
        .select('-refreshToken -password')
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
        success: users ? true : false,
        data: {
            users,
            totalUsers
        }
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logOut,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    finalRegister
}