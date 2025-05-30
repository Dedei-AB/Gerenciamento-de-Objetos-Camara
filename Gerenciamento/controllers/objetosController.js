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
and idPiso=Piso_idPiso;`;
  db.query(sql, (err, results) => {
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
        erro: err.sqlMessage || err.message || "Erro ao cadastrar objeto",
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

exports.buscarObjetoAtualizar = (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT idObjeto, codigo, Nome as estado, NomePiso as piso, NomeSala as local, NomeDoTipo as nome
    FROM bancodeobjetos.objeto, bancodeobjetos.status, bancodeobjetos.sala, bancodeobjetos.tiposala, bancodeobjetos.piso, bancodeobjetos.tipoobjeto
    where idStatus = Status_idStatus and idSala = Sala_idSala and TipoSala_idTipoSala = idTipoSala and Piso_idPiso = idPiso and TipoObjeto_idTipoObjeto = idTipoObjeto and
    objeto.codigo = ? `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar o objeto" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Objeto não encontrado" });
    }

    res.json(results[0]);
  });
};

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
      return res.status(500).json({ erro: "Erro ao atualizar objeto" });
    }

    res.status(201).json({ mensagem: "Objeto atualizado com sucesso! :)" });
  });
};
