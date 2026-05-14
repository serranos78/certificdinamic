const express = require('express');
const router = express.Router();
const db = require('./db');

// ✅ CONSULTA JOIN
router.get('/anime/:id/personajes', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.*, a.descripcionanime
    FROM personaje p
    INNER JOIN anime a ON p.idanime = a.idanime
    WHERE a.idanime = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;