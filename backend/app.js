const express = require("express");
const app = express();
const objetosRoutes = require("./routes/objeto.js"); // Importando o arquivo de rotas

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", objetosRoutes);

const PORT = 3000;
const HOST = "0.0.0.0"; // escuta em todas as interfaces

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
