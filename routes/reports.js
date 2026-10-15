const express = require('express');
const router = express.Router();

router.get('/reports', (req, res) => {
    res.json({ message: "Reports module active" });
});

module.exports = router;