const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students
router.get('/students', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        console.error("Database fetch error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Add a new student
router.post('/students', async (req, res) => {
    const { name, dob, gender, address, phone, email, class_name, enrollment_date } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO students (name, dob, gender, address, phone, email, class_name, enrollment_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, dob || null, gender || null, address || null, phone || null, email, class_name || null, enrollment_date || null]
        );
        res.status(201).json({ message: "Student added successfully", studentId: result.insertId });
    } catch (err) {
        console.error("Database insert error:", err); // This will print the exact SQL error in your terminal!
        res.status(500).json({ error: err.message });
    }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        await db.query('DELETE FROM students WHERE id = ?', [studentId]);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;