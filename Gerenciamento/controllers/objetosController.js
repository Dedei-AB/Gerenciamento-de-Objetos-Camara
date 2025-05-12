const db = require("../config/db");

exports.getObjetos = (req, res) => {
  db.query("SELECT * FROM objeto", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar objetos" });
    res.json(results);
  });
};

exports.buscarObjetos = (req, res) => {
  const sql = `SELECT codigo, NomeDoTipo, Nome, NomeSala, Complemento FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tipoobjeto, bancodeobjetos.tiposala, bancodeobjetos.piso
where TipoObjeto_idTipoObjeto = idTipoObjeto 
and Status_idStatus=idStatus
and idSala= Sala_idSala
and TipoSala_idTipoSala=idTipoSala
and idPiso=Piso_idPiso;`; 
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.cadastrarObjeto = (req, res) => {
  const { codigo, tipoObjeto, complemento, status, sala } = req.body;

  const sql = `
    INSERT INTO objetos (codigo, tipoObjeto, complemento, status, sala)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [codigo, tipoObjeto, complemento, status, sala], (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar objeto' });
    }

    res.status(200).json({ mensagem: 'Objeto cadastrado com sucesso' });
  });
};
exports.gerarCodigo = (req, res) => {
  const codigo = Math.floor(100000 + Math.random() * 900000);
  res.json({ codigo });
};