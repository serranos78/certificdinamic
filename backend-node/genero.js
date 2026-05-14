const express = require('express');
const router = express.Router();
const db = require('./db');

// ✅ GET (listar)
router.get('/', (req, res) => {
  db.query("SELECT * FROM genero", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ CREATE
router.post('/', (req, res) => {
  const { nombre, descripcion, popularidad } = req.body;

  db.query(
    "INSERT INTO genero (nombre, descripcion, popularidad) VALUES (?, ?, ?)",
    [nombre, descripcion, popularidad],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// ✅ UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, popularidad } = req.body;

  db.query(
    "UPDATE genero SET nombre=?, descripcion=?, popularidad=? WHERE idgenero=?",
    [nombre, descripcion, popularidad, id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// ✅ DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM genero WHERE idgenero=?", [id], err => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;