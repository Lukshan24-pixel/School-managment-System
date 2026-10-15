const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/subjects', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM subjects');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/subjects', async (req, res) => {
    const { subject_name, subject_code, assigned_teacher } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO subjects (subject_name, subject_code, assigned_teacher) VALUES (?, ?, ?)',
            [subject_name, subject_code, assigned_teacher]
        );
        res.status(201).json({ message: "Subject added successfully", subjectId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/subjects/:id', async (req, res) => {
    const subjectId = req.params.id;
    try {
        await db.query('DELETE FROM subjects WHERE id = ?', [subjectId]);
        res.json({ message: "Subject deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;