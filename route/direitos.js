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


app.post("/direitos", (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ mensagem: "Título e descrição são obrigatórios." });
  }

  const novoDireito = {
    id: direitos.length + 1,
    titulo,
    descricao
  };

  direitos.push(novoDireito);
  res.status(201).json(novoDireito);
});

app.put("/direitos/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;

  const direito = direitos.find(d => d.id === parseInt(id));
  if (!direito) {
    return res.status(404).json({ mensagem: "Direito não encontrado." });
  }

  if (titulo) direito.titulo = titulo;
  if (descricao) direito.descricao = descricao;

  res.json(direito);
});


app.delete("/direitos/:id", (req, res) => {
  const { id } = req.params;

  const index = direitos.findIndex(d => d.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ mensagem: "Direito não encontrado." });
  }

  const direitoRemovido = direitos.splice(index, 1);
  res.json({ mensagem: "Direito removido com sucesso", direito: direitoRemovido[0] });
});
