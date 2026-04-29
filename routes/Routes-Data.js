const express = require('express');
const router = express.Router();
const { verifyToken } = require('./../middleware/auth'); // Import middleware yang sudah kamu buat

// Endpoint khusus untuk cek validitas JWT
router.post('/verify-token', verifyToken, (req, res) => {
    // Jika middleware verifyToken berhasil lolos, berarti JWT valid
    res.status(200).json({ 
        message: "JWT Valid",
        user: {
            username: req.user.username, // Data diambil dari payload token
            role: req.user.role
        }
    });
});

module.exports = router;