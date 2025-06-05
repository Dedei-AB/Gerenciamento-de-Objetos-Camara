const mysql = require("mysql2");




connection.connect((err) => {
  if (err) {
    console.log("Erro ao conectar", err);
  } else {
    console.log("Conectado");
  }
});

module.exports = connection;
