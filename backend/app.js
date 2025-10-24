const express = require("express");
const app = express();
const { getDatabase } = require("./config/db");

app.use(express.json());

app.use("/visitas", visitasRoutes);
app.use("/objetos", objetosRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
