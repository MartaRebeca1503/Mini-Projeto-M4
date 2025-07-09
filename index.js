const express = require("express");
const app = express();
const port = 3000;

// Dados simulados
const redesApoio = [
  { id: 1, nome: "Casa 1", cidade: "São Paulo", estado: "SP", contato: "https://www.casaum.org" },
  { id: 2, nome: "Grupo Arco-Íris", cidade: "Rio de Janeiro", estado: "RJ", contato: "https://arcoiris.org.br" },
  { id: 3, nome: "Centro de Referência LGBT+", cidade: "Belo Horizonte", estado: "MG", contato: "centrolgbt@pbh.gov.br" }
];

const dadosViolencia = [
  { id: 1, ano: 2023, estado: "SP", casos: 230 },
  { id: 2, ano: 2023, estado: "RJ", casos: 180 },
  { id: 3, ano: 2022, estado: "SP", casos: 210 }
];

const direitos = [
  { id: 1, titulo: "Nome social", descricao: "Pessoas trans têm direito ao uso do nome social em todas as instituições públicas." },
  { id: 2, titulo: "União civil", descricao: "Casais homoafetivos têm direito à união estável e casamento civil." },
  { id: 3, titulo: "Retificação de documentos", descricao: "Pessoas trans têm direito a retificar nome e gênero em documentos sem necessidade de cirurgia." }
];

const midias = [
  { id: 1, tipo: "Livro", titulo: "Amora", autora: "Natália Borges Polesso", descricao: "Contos sobre relacionamentos lésbicos" },
  { id: 2, tipo: "Filme", titulo: "Hoje Eu Quero Voltar Sozinho", diretor: "Daniel Ribeiro", descricao: "Drama sobre descoberta da sexualidade na adolescência" },
  { id: 3, tipo: "Série", titulo: "Pose", criador: "Ryan Murphy", descricao: "Série sobre a cultura ballroom e comunidade trans nos anos 80" }
];

app.use(express.json()); // Necessário para ler corpo da requisição POST/PUT


// Rota principal com documentação
app.get("/", (req, res) => {
  res.json({
    nome: "API LGBTQIA+",
    descricao: "API com recursos e informações para comunidade LGBTQIA+, com foco em pessoas trans, travestis e não-binárias",
    endpoints: [
      { caminho: "/redesApoio", descricao: "Retorna redes de apoio disponíveis", parametros: "?estado=SP" },
      { caminho: "/dadosViolencia", descricao: "Dados estatísticos sobre violência", parametros: "?ano=2023&estado=RJ" },
      { caminho: "/direitos", descricao: "Informações sobre direitos legais", parametros: "?id=1" },
      { caminho: "/indicacoesMidia", descricao: "Recomendações culturais", parametros: "?tipo=Livro" }
    ]
  });
});

// Rota para redes de apoio
app.get("/redesApoio", (req, res) => {
  const { estado } = req.query;
  
  if (estado) {
    const redesFiltradas = redesApoio.filter(rede => 
      rede.estado.toLowerCase() === estado.toLowerCase());
    return res.json(redesFiltradas);
  }
  
  res.json(redesApoio);
});

// Rota para dados de violência
app.get("/dadosViolencia", (req, res) => {
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

// Rota para direitos
app.get("/direitos", (req, res) => {
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

// Rota para indicações de mídia
app.get("/indicacoesMidia", (req, res) => {
  const { tipo } = req.query;
  
  if (tipo) {
    const midiasFiltradas = midias.filter(midia => 
      midia.tipo.toLowerCase() === tipo.toLowerCase());
    return res.json(midiasFiltradas);
  }
  
  res.json(midias);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});