const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('./../models/Model-User');

const JWT_SECRET = process.env.JWT_SECRET; // Sebaiknya simpan di file .env

// --- REGISTER (Hanya dijalankan sekali untuk buat akun admin) ---
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek jika user sudah ada
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User sudah terdaftar' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan ke DB
        user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User berhasil dibuat' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- LOGIN (Untuk mendapatkan Token) ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Username atau Password salah' });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Username atau Password salah' });

        // Buat JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' } // Token hangus dalam 24 jam
        );

        res.json({
            message: 'Login Berhasil',
            token: token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;