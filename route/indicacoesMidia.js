// routes/indicacoesMidia.js
const express = require('express');
const router = express.Router();
const { midias } = require('../data/database');

router.get('/', (req, res) => {
  const { tipo } = req.query;
  
  if (tipo) {
    const midiasFiltradas = midias.filter(midia => 
      midia.tipo.toLowerCase() === tipo.toLowerCase());
    return res.json(midiasFiltradas);
  }
  
  res.json(midias);
});

module.exports = router;