const db = require("../config/db");

// Selects da página Buscar (Andrei)

exports.getObjetos = (req, res) => {
  db.query("SELECT * FROM objeto", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar objetos" });
    res.json(results);
  });
};

exports.buscarObjetos = (req, res) => {
  const sql = `SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tipoobjeto, bancodeobjetos.tiposala, bancodeobjetos.piso
where TipoObjeto_idTipoObjeto = idTipoObjeto 
and Status_idStatus=idStatus
and idSala= Sala_idSala
and TipoSala_idTipoSala=idTipoSala
and idPiso=Piso_idPiso
ORDER BY codigo ASC;`;

  const codigo = req.body

  db.query(sql, codigo, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.buscarObjetosTipoObj = (req, res) => {
  const sql = `SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tipoobjeto, bancodeobjetos.tiposala, bancodeobjetos.piso
where TipoObjeto_idTipoObjeto = idTipoObjeto 
and Status_idStatus=idStatus
and idSala= Sala_idSala
and TipoSala_idTipoSala=idTipoSala
and idPiso=Piso_idPiso
ORDER BY NomeDoTipo ASC;`;

  const codigo = req.body

  db.query(sql, codigo, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.buscarObjetosNome = (req, res) => {
  const sql = `SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tipoobjeto, bancodeobjetos.tiposala, bancodeobjetos.piso
where TipoObjeto_idTipoObjeto = idTipoObjeto 
and Status_idStatus=idStatus
and idSala= Sala_idSala
and TipoSala_idTipoSala=idTipoSala
and idPiso=Piso_idPiso
ORDER BY complemento ASC;`;

  const codigo = req.body

  db.query(sql, codigo, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.buscarObjetosSala = (req, res) => {
  const sql = `SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tipoobjeto, bancodeobjetos.tiposala, bancodeobjetos.piso
where TipoObjeto_idTipoObjeto = idTipoObjeto 
and Status_idStatus=idStatus
and idSala= Sala_idSala
and TipoSala_idTipoSala=idTipoSala
and idPiso=Piso_idPiso
ORDER BY NomeSala ASC;`;

  const codigo = req.body

  db.query(sql, codigo, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.buscarObjetosStatus = (req, res) => {
  const sql = `SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tipoobjeto, bancodeobjetos.tiposala, bancodeobjetos.piso
where TipoObjeto_idTipoObjeto = idTipoObjeto 
and Status_idStatus=idStatus
and idSala= Sala_idSala
and TipoSala_idTipoSala=idTipoSala
and idPiso=Piso_idPiso
ORDER BY Nome ASC;`;

  const codigo = req.body

  db.query(sql, codigo, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// -----------------------------------------------------------------------------------
// Selects da página Cadastrar (Emanuel)

exports.cadastrarObjeto = (req, res) => {
  const { idObjeto, codigo, tipoObjeto, complemento, status, sala } = req.body;

  const sql =
    "INSERT INTO objeto ( codigo, TipoObjeto_idTipoObjeto, complemento, Status_idStatus, Sala_idSala) VALUES ( ?, ?, ?, ?, ?)";
  const values = [codigo, tipoObjeto, complemento, status, sala];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir:", err.sqlMessage || err.message || err);
      return res.status(500).json({
        erro: (err.sqlMessage? "Código já utilizado.": "none")|| (err.message? "Código já utilizado.": "none") || "Erro ao cadastrar objeto",
      });
    }
    res.status(201).json({ mensagem: "Objeto cadastrado com sucesso" });
  });
};

exports.buscarSalas = (req, res) => {
  const sql = "SELECT idSala, NomeSala, Piso_idPiso FROM sala;";

  db.query(sql, (err, resultados) => {
    if (err) {
      console.error("Erro ao buscar salas:", err);
      return res.status(500).json({ erro: "Erro ao buscar salas" });
    }

    res.json(resultados); // Array de objetos { idSala, NomeSala }
  });
};

// -----------------------------------------------------------------------------------
// Selects da página Atualizar (Macedo)

exports.atualizarObjetos = (req, res) => {
  const { status, sala, complemento, codigo, idObjeto } = req.body;
  const sql = `
    UPDATE objeto 
    SET Status_idStatus = ?, 
        Sala_idSala = ?, 
        Complemento = ?,
        codigo = ?
    WHERE idObjeto = ?`;

  const values = [status, sala, complemento, codigo, idObjeto];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir:", err);
      return res.status(500).json({
        erro: (err.sqlMessage? "Código já utilizado.": "none")|| (err.message? "Código já utilizado.": "none") || "Erro ao cadastrar objeto",
      });
    }

    res.status(201).json({ mensagem: "Objeto atualizado com sucesso!" });
  });
};
