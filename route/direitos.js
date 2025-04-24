// routes/direitos.js
const express = require('express');
const router = express.Router();
const { direitos } = require('../data/database');

router.get('/', (req, res) => {
  const { id } = req.query;
  
  if (id) {
    const direito = direitos.find(d => d.id === parseInt(id));
    if (direito) {
      return res.json(direito);
    }
    return res.status(404).json({ mensagem: "Direito não encontrado" });
  }
  
  res.json(direitos);
});

module.exports = router;