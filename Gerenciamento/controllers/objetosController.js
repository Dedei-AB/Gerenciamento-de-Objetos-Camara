const db = require('../config/db');

exports.getObjetos = (req, res) => {
  db.query('SELECT * FROM objeto', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar objetos' });
    res.json(results);
  });
};