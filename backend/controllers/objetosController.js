const { getDatabase } = require("../config/db");
const db = getDatabase("bancodeobjetos"); // ✅ conexão certa

// ---------------------- Página Buscar (Andrei) ----------------------

exports.getObjetos = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM objeto");
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar objetos" });
  }
};

exports.buscarObjetos = async (req, res) => {
  const sql = `
    SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento 
    FROM objeto
    JOIN status ON Status_idStatus = idStatus
    JOIN sala ON idSala = Sala_idSala
    JOIN tipoobjeto ON TipoObjeto_idTipoObjeto = idTipoObjeto
    JOIN tiposala ON TipoSala_idTipoSala = idTipoSala
    JOIN piso ON idPiso = Piso_idPiso
    ORDER BY codigo ASC;
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar objetos:", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.buscarObjetosTipoObj = async (req, res) => {
  const sql = `
    SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento
    FROM objeto
    JOIN status ON Status_idStatus = idStatus
    JOIN sala ON idSala = Sala_idSala
    JOIN tipoobjeto ON TipoObjeto_idTipoObjeto = idTipoObjeto
    JOIN tiposala ON TipoSala_idTipoSala = idTipoSala
    JOIN piso ON idPiso = Piso_idPiso
    ORDER BY NomeDoTipo ASC;
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.buscarObjetosNome = async (req, res) => {
  const sql = `
    SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento
    FROM objeto
    JOIN status ON Status_idStatus = idStatus
    JOIN sala ON idSala = Sala_idSala
    JOIN tipoobjeto ON TipoObjeto_idTipoObjeto = idTipoObjeto
    JOIN tiposala ON TipoSala_idTipoSala = idTipoSala
    JOIN piso ON idPiso = Piso_idPiso
    ORDER BY Complemento ASC;
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.buscarObjetosSala = async (req, res) => {
  const sql = `
    SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento
    FROM objeto
    JOIN status ON Status_idStatus = idStatus
    JOIN sala ON idSala = Sala_idSala
    JOIN tipoobjeto ON TipoObjeto_idTipoObjeto = idTipoObjeto
    JOIN tiposala ON TipoSala_idTipoSala = idTipoSala
    JOIN piso ON idPiso = Piso_idPiso
    ORDER BY NomeSala ASC;
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.buscarObjetosStatus = async (req, res) => {
  const sql = `
    SELECT idObjeto, codigo, NomeDoTipo, Nome, NomeSala, Complemento
    FROM objeto
    JOIN status ON Status_idStatus = idStatus
    JOIN sala ON idSala = Sala_idSala
    JOIN tipoobjeto ON TipoObjeto_idTipoObjeto = idTipoObjeto
    JOIN tiposala ON TipoSala_idTipoSala = idTipoSala
    JOIN piso ON idPiso = Piso_idPiso
    ORDER BY Nome ASC;
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// ---------------------- Página Cadastrar (Emanuel) ----------------------

exports.cadastrarObjeto = async (req, res) => {
  const { codigo, tipoObjeto, complemento, status, sala } = req.body;
  const sql = `
    INSERT INTO objeto (codigo, TipoObjeto_idTipoObjeto, complemento, Status_idStatus, Sala_idSala)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    await db.query(sql, [codigo, tipoObjeto, complemento, status, sala]);
    res.status(201).json({ mensagem: "Objeto cadastrado com sucesso" });
  } catch (err) {
    console.error("Erro ao cadastrar objeto:", err);
    res.status(500).json({
      erro: err.sqlMessage || "Erro ao cadastrar objeto",
    });
  }
};

exports.buscarSalas = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT idSala, NomeSala, Piso_idPiso FROM sala;"
    );
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar salas:", err);
    res.status(500).json({ erro: "Erro ao buscar salas" });
  }
};

// ---------------------- Página Atualizar (Macedo) ----------------------

exports.atualizarObjetos = async (req, res) => {
  const { status, sala, complemento, codigo, idObjeto } = req.body;
  const sql = `
    UPDATE objeto
    SET Status_idStatus = ?, Sala_idSala = ?, Complemento = ?, codigo = ?
    WHERE idObjeto = ?
  `;
  try {
    await db.query(sql, [status, sala, complemento, codigo, idObjeto]);
    res.status(200).json({ mensagem: "Objeto atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar objeto:", err);
    res.status(500).json({
      erro: err.sqlMessage || "Erro ao atualizar objeto",
    });
  }
};
