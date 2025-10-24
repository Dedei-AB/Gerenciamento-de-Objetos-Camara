const express = require("express");
const cors = require("cors");
const { getDatabase } = require("./config/db");

const visitasRoutes = require("./routes/visitas");
const objetosRoutes = require("./routes/objeto");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/visitas", visitasRoutes);
app.use("/objetos", objetosRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
