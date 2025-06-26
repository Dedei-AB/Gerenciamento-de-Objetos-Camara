require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "Admin",
  password: process.env.DB_PASSWORD || "Mudar@1234",
  database: process.env.DB_NAME || "bancodeobjetos",
});

setTimeout(() => {
  connection.connect((err) => {
    if (err) {
      console.log("Erro ao conectar", err);
    } else {
      console.log("Conectado com sucesso!");
    }
  });
}, 10000); // espera 5 segundos

module.exports = connection;
