const express = require("express");
const app = express();
const { getDatabase } = require("./config/db");

app.use(express.json());

// Exemplo de rota com sistemaVisita
app.get("/usuariosVisita", async (req, res) => {
  const db = getDatabase("sistemaVisita");
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no sistema de visita");
  }
});

// Exemplo de rota com bancodeobjetos
app.get("/objetos", async (req, res) => {
  const db = getDatabase("bancodeobjetos");
  try {
    const [rows] = await db.query("SELECT * FROM objetos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no banco de objetos");
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
