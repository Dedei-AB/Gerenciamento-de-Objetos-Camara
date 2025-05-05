const express = require("express")
const app = express()
const objetosRoutes = require("./routes/objeto")

app.use(express.json());
app.use(express.static('public')); // arquivos HTML, CSS, JS frontend

app.use('/objetos', objetosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});