const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Add your validation logic here (e.g., checking against a database)
    if (email && password) {
        res.status(200).json({ success: true, message: "Login successful" });
    } else {
        res.status(400).json({ success: false, error: "Email and password are required" });
    }
});

module.exports = router;