const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');  

const verifyAccessToken = asyncHandler(async(req, res, next) => {
    // Bearer token
    // headers: {authorization: Bearer token}
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err) return res.status(401).json({
                success: false,
                mes: 'Invalid access token'
            })
            //console.log(decode);
            req.user = decode;
            next();
        })
    }
    else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!'
        })
    }
}) 

const isAdmin = asyncHandler(async(req, res, next) => {
    const { role } = req.user;
    if (role !== 'SPSO') 
    return res.status(401).json({
        success: false,
        mes: 'Require SPSO role'
    })
    next();
})
module.exports = {
    verifyAccessToken,
    isAdmin
}