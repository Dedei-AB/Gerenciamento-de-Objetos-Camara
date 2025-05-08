const express = require("express");
const app = express();
const objetosRoutes = require("./routes/objeto.js"); // Importando o arquivo de rotas

app.use(express.json());
app.use(express.static('public')); // Arquivos estáticos como HTML, CSS, JS

// Mapeando a rota /objetos para o arquivo de rotas
app.use('/objetos', objetosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});