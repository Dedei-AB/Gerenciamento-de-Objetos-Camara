const db = require("../config/db");

exports.getObjetos = (req, res) => {
  db.query("SELECT * FROM objeto", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar objetos" });
    res.json(results);
  });
};

exports.buscarObjetos = (req, res) => {
  const sql = 'SELECT * FROM objeto'; // ajuste conforme seu banco
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
