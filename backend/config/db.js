require("dotenv").config();
const mysql = require("mysql2");

// Cria um pool de conexões
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "Admin",
  password: process.env.DB_PASSWORD || "Mudar@1234",
  database: process.env.DB_NAME || "bancodeobjetos",
  waitForConnections: true,
  queueLimit: 0,
});

// Testa a conexão após 10 segundos (ajustável conforme startup do MySQL)
setTimeout(() => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Erro ao conectar ao banco:", err);
    } else {
      console.log("Conectado com sucesso ao banco via pool!");
      connection.release(); // Libera a conexão de volta ao pool
    }
  });
}, 10000); // espera 10 segundos

module.exports = pool;
