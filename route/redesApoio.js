// routes/redesApoio.js
const express = require('express');
const router = express.Router();
const { redesApoio } = require('../data/database');

router.get('/', (req, res) => {
  const { estado } = req.query;
  
  if (estado) {
    const redesFiltradas = redesApoio.filter(rede => 
      rede.estado.toLowerCase() === estado.toLowerCase());
    return res.json(redesFiltradas);
  }
  
  res.json(redesApoio);
});

module.exports = router;