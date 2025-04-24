// routes/dadosViolencia.js
const express = require('express');
const router = express.Router();
const { dadosViolencia } = require('../data/database');

router.get('/', (req, res) => {
  const { ano, estado } = req.query;
  
  let dadosFiltrados = dadosViolencia;
  
  if (ano) {
    dadosFiltrados = dadosFiltrados.filter(dado => 
      dado.ano.toString() === ano);
  }
  
  if (estado) {
    dadosFiltrados = dadosFiltrados.filter(dado => 
      dado.estado.toLowerCase() === estado.toLowerCase());
  }
  
  res.json(dadosFiltrados);
});

module.exports = router;