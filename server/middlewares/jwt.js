require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    
    const white_lists = ["/", "/register", "/login"];
    if (white_lists.find(item => '/api/user' + item === req.originalUrl)) {
        next();
    }
    else
        if (req?.headers?.authorization?.split(' ')[1]){
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.user = decoded;
                next();
            }
            catch (error) {
                return res.status(401).json({ error: 'Token is not valid' });
            }
        } else {
            return res.status(401).json({ error: 'Token not found' });
        }
    }

module.exports = auth;