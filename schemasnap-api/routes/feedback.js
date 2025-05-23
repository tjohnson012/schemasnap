const express = require('express');
const router = express.Router();
const lintSchema = require('../utils/lintSchema');

router.post('/', (req, res) => {
  const { sql } = req.body;
  if (!sql) return res.status(400).json({ error: "Missing SQL input" });

  const results = lintSchema(sql);
  return res.json({ suggestions: results.map(r => r.message) });
});

module.exports = router;
