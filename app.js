const express = require("express");
const app = express();
const objetosRoutes = require("./routes/objeto.js"); // Importando o arquivo de rotas

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", objetosRoutes);

const PORT = 3306;
const HOST = "localhost"; // escuta em todas as interfaces

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
