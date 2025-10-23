const { getDatabase } = require("../config/db");
const db = getDatabase("sistemaVisita");

// ------------------- Listar visitas -------------------

// Lista visitas já concluídas
exports.listarVisitasConcluidas = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.idPessoa, 
        p.Nome, 
        p.Cpf,
        p.Telefone,
        v.DateTimeEntrada,
        v.DateTimeSaida
      FROM pessoa p
      JOIN visitas v 
        ON p.idPessoa = v.Pessoa_idPessoa
      WHERE v.DateTimeEntrada IS NOT NULL
        AND v.DateTimeSaida IS NOT NULL;
    `);
    res.json(results);
  } catch (err) {
    console.error("Erro ao listar visitas:", err);
    res.status(500).send("Erro no banco de dados!");
  }
};

// Lista pessoas atualmente na câmara
exports.listarPessoasNaCamara = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.idPessoa, 
        v.idVisitas,
        p.Nome, 
        p.Cpf, 
        v.DateTimeEntrada, 
        p.Telefone, 
        p.Observacao,
        v.DateTimeSaida
      FROM pessoa p
      JOIN visitas v 
        ON p.idPessoa = v.Pessoa_idPessoa
      WHERE v.DateTimeSaida IS NULL;
    `);
    res.json(results);
  } catch (err) {
    console.error("Erro ao listar pessoas na câmara:", err);
    res.status(500).send("Erro no banco de dados!");
  }
};

// ------------------- Registrar entrada -------------------

exports.registrarEntrada = async (req, res) => {
  const { Nome, Cpf, Telefone, Observacao, DateTimeEntrada } = req.body;

  if (!Nome) {
    return res.status(400).json({ error: "Nome é uma área obrigatória" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO pessoa (Nome, Cpf, Telefone, Observacao) VALUES (?, ?, ?, ?)",
      [Nome, Cpf, Telefone, Observacao]
    );

    const pessoaId = result.insertId;

    await db.query(
      `INSERT INTO visitas (Pessoa_idPessoa, DateTimeEntrada) VALUES (?, ?)`,
      [pessoaId, DateTimeEntrada]
    );

    res.status(201).json({
      message: "Pessoa cadastrada e entrada registrada com sucesso",
      id: pessoaId,
    });
  } catch (err) {
    console.error("Erro ao registrar entrada:", err);
    res.status(500).json({ error: "Erro ao cadastrar pessoa" });
  }
};

// ------------------- Registrar saída (nova pessoa) -------------------

exports.registrarSaidaComNovaPessoa = async (req, res) => {
  const { Nome, Cpf, Telefone, Observacao, DateTimeEntrada } = req.body;

  if (!Nome) {
    return res.status(400).json({ error: "Nome é uma área obrigatória!" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO pessoa (Nome, Cpf, Telefone, Observacao) VALUES (?, ?, ?, ?)",
      [Nome, Cpf, Telefone, Observacao]
    );

    const pessoaId = result.insertId;

    await db.query(
      `INSERT INTO visitas (Pessoa_idPessoa, DateTimeEntrada, DateTimeSaida)
       VALUES (?, ?, ?)`,
      [pessoaId, DateTimeEntrada, DateTimeEntrada]
    );

    res.status(201).json({
      message: "Pessoa cadastrada e saída registrada com sucesso",
      id: pessoaId,
    });
  } catch (err) {
    console.error("Erro ao registrar saída:", err);
    res.status(500).json({ error: "Erro ao cadastrar pessoa com saída" });
  }
};

// ------------------- Finalizar visita existente -------------------

exports.finalizarVisita = async (req, res) => {
  try {
    const idVisita = req.params.id;
    const agora = new Date();
    agora.setHours(agora.getHours() - 3);

    const formatado = agora.toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(
      `UPDATE visitas SET DateTimeSaida = ? WHERE idVisitas = ? AND DateTimeSaida IS NULL`,
      [formatado, idVisita]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Visita finalizada com sucesso!" });
    } else {
      res
        .status(404)
        .json({ message: "Visita não encontrada ou já finalizada." });
    }
  } catch (err) {
    console.error("Erro ao finalizar visita:", err);
    res.status(500).json({ error: "Erro ao finalizar visita." });
  }
};

// ------------------- Editar pessoa -------------------

exports.buscarPessoa = async (req, res) => {
  try {
    const idPessoa = Number(req.params.id);
    const [result] = await db.query(
      `SELECT * FROM pessoa WHERE idPessoa = ?;`,
      [idPessoa]
    );
    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar pessoa:", err);
    res.status(500).send("Erro no banco de dados!");
  }
};

exports.editarPessoa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, telefone, observacao } = req.body;

    const [resultado] = await db.execute(
      `
      UPDATE pessoa
      SET nome = ?, cpf = ?, telefone = ?, observacao = ?
      WHERE idPessoa = ?
    `,
      [nome, cpf, telefone, observacao, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    res.json({ message: "Pessoa atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
