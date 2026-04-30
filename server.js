const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Routing List

const routeLogin = require('./routes/Routes-Login');
const routeAuth = require('./routes/Routes-Data');

// Server Settings
const app = express();
const port = process.env.PORT;
// const MONGODB_URI = process.env.MONGODB_URI;
const MongoDB_URI = 'mongodb+srv://Vercel-Admin-ToA:J3UV7LZSB1HYzhdg@toa.9likqlg.mongodb.net/?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout setelah 5 detik
    family: 4 // Paksa menggunakan IPv4 jika DNS bermasalah
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
    console.error('Koneksi Gagal!');
    console.error('Pesan Error:', err.message);
});

// Routing
app.use('/Login', routeLogin);
app.use('/Auth', routeAuth);

// Server Host
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});