<<<<<<< Updated upstream
const {default: mongoose} = require('mongoose');

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if(connect.connection.readyState === 1) console.log('DB connected successfully');
        else console.log('DB connecting');
    } catch(error) {
        console.log('DB connection failed');
        throw new Error(error);
=======
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = async (retries = 3, delay = 5000) => {
    while (retries > 0) {
        try {
            const connect = await mongoose.connect(process.env.MONGODB_URI);
            if (connect.connection.readyState === 1) {
                console.log('DB connected successfully');
                return; // Dừng lại khi kết nối thành công
            } else {
                console.log('DB connecting');
            }
        } catch (error) {
            retries -= 1;
            console.error(`DB connection failed. Retries left: ${retries}`);
            console.error(error.message);

            if (retries === 0) {
                throw new Error('All retries failed. DB connection unsuccessful.');
            }

            // Chờ trước khi thử lại
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
>>>>>>> Stashed changes
    }
}

module.exports = dbConnect;