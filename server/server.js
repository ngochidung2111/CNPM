const express = require('express');
require('dotenv').config();
const dbConnect = require('./configs/dbconnect');
const initRoutes = require('./routes'); 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Configuration = require('./models/configuration');

const app = express();
const port = process.env.PORT || 8888
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// được thì dùng cache để store luôn

// let appConfig = {};

// const loadConfiguration = async () => {
//     try {
//         const config = await Configuration.findOne();
//         if (config) {
//             appConfig = config.toObject();
//             console.log('Configuration loaded:', appConfig);
//         } else {
//             console.log('No configuration found.');
//         }
//     } catch (error) {
//         console.error('Error loading configuration:', error);
//     }
// };

// loadConfiguration();

// global.appConfig = appConfig;

// Configuration.watch().on('change', async () => {
//     try {
//         const config = await Configuration.findOne();
//         if (config) {
//             global.appConfig = config.toObject();
//             console.log('Configuration updated:', global.appConfig);
//         }
//     } catch (error) {
//         console.error('Error updating configuration:', error);
//     }
// });

// Ket noi database
dbConnect();
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})