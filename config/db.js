const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "switchback.proxy.rlwy.net",
  user: "root",
  password: "HicNxVlAbsfTwOoBFeoPLvdPGKFgRbrM",
  database: "railway",
  port: 3306, // <- veja na Railway qual porta está definida
  ssl: { rejectUnauthorized: false }
});


connection.connect((err) => {
  if (err) {
    console.log("Erro ao conectar", err);
  } else {
    console.log("Conectado");
  }
});

module.exports = connection;
