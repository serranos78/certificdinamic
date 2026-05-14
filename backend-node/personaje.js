const express = require('express');
const router = express.Router();
const db = require('./db');

// ✅ GET (listar)
router.get('/', (req, res) => {
  db.query("SELECT * FROM personaje", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ CREATE
router.post('/', (req, res) => {
  const { nombre, edad, rol, fecha_aparicion, idanime } = req.body;

  const sql = `
    INSERT INTO personaje (nombre, edad, rol, fecha_aparicion, idanime)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre, edad, rol, fecha_aparicion, idanime], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// ✅ UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad, rol, fecha_aparicion, idanime } = req.body;

  const sql = `
    UPDATE personaje 
    SET nombre=?, edad=?, rol=?, fecha_aparicion=?, idanime=?
    WHERE idpersonaje=?
  `;

  db.query(sql, [nombre, edad, rol, fecha_aparicion, idanime, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// ✅ DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM personaje WHERE idpersonaje=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;
