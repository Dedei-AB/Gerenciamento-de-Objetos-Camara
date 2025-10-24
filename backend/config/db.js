require("dotenv").config();
const mysql = require("mysql2");

// Conexão sistemaVisita
const poolSistemaVisita = mysql.createPool({
  connectionLimit: 10,
  host: "10.1.150.10",
  port: 3306,
  user: "root",
  password: "root",
  database: "sistemaVisita",
  timezone: "Z",
  waitForConnections: true,
  queueLimit: 0,
});
const dbSistemaVisita = poolSistemaVisita.promise();

// Conexão bancodeobjetos
const poolBancodeObjetos = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "10.1.150.10",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "Admin",
  password: process.env.DB_PASSWORD || "Mudar@1234",
  database: process.env.DB_NAME || "bancodeobjetos",
  waitForConnections: true,
  queueLimit: 0,
});
const dbBancodeObjetos = poolBancodeObjetos.promise();

// Função para escolher o banco
function getDatabase(name) {
  switch (name) {
    case "sistemaVisita":
      return dbSistemaVisita;
    case "bancodeobjetos":
      return dbBancodeObjetos;
    default:
      throw new Error("Banco de dados desconhecido: " + name);
  }
}

module.exports = { getDatabase };
