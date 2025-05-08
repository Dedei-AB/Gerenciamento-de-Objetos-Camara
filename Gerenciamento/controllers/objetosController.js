const db = require("../config/db");

exports.getObjetos = (req, res) => {
  db.query("SELECT * FROM objeto", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar objetos" });
    res.json(results);
  });
};

exports.getTipoObjeto = (req, res) => {
  db.query(
    "SELECT TipoObjeto_idTipoObjeto, codigo FROM bancodeobjetos.objeto;",
    (err, results) => {
      if (err) {
        console.error("Erro na consulta SQL:", err); // Logando o erro no servidor
        return res.status(500).json({ erro: "Erro ao buscar tipos de objeto" }); // Respondendo com erro
      }
      console.log("Resultados da consulta:", results); // Exibindo resultados no servidor
      res.json(results); // Enviando resultados como JSON
    }
  );
};
