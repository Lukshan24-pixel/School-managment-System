const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/classes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM classes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/classes', async (req, res) => {
    const { class_name, grade, class_teacher, academic_year } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO classes (class_name, grade, class_teacher, academic_year) VALUES (?, ?, ?, ?)',
            [class_name, grade, class_teacher, academic_year]
        );
        res.status(201).json({ message: "Class added successfully", classId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/classes/:id', async (req, res) => {
    const classId = req.params.id;
    try {
        await db.query('DELETE FROM classes WHERE id = ?', [classId]);
        res.json({ message: "Class deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;