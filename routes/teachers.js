const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/teachers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM teachers');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/teachers', async (req, res) => {
    const { name, gender, phone, email, address, assigned_subject } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO teachers (name, gender, phone, email, address, assigned_subject) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, gender, phone, email, address, assigned_subject]
        );
        res.status(201).json({ message: "Teacher added successfully", teacherId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/teachers/:id', async (req, res) => {
    const teacherId = req.params.id;
    try {
        await db.query('DELETE FROM teachers WHERE id = ?', [teacherId]);
        res.json({ message: "Teacher deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;