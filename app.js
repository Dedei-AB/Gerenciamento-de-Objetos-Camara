const express = require("express");
const app = express();
const objetosRoutes = require("./routes/objeto.js"); // Importando o arquivo de rotas

app.use(express.json());
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

app.use('/', objetosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});