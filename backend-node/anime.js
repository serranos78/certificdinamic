const express = require('express');
const router = express.Router();
const db = require('./db');

// ✅ GET (listar)
router.get('/', (req, res) => {
  db.query("SELECT * FROM anime ORDER BY idanime DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ CREATE
router.post('/', (req, res) => {
  const { descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam } = req.body;

  const sql = `
    INSERT INTO anime (descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// ✅ UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam } = req.body;

  const sql = `
    UPDATE anime SET descripcionanime=?, numtemporadas=?, capitulos=?, fechalanzam=?, empresalanzam=? 
    WHERE idanime=?
  `;

  db.query(sql, [descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// ✅ DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM anime WHERE idanime=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;
