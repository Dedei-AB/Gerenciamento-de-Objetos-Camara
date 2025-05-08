const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // Certifique-se de ter a conexão configurada corretamente



// Rota para /tipos
router.get("/tipos", (req, res) => {
  connection.query("SELECT TipoObjeto_idTipoObjeto, codigo FROM bancodeobjetos.objeto;", (err, results) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);  // Logando o erro no servidor
      return res.status(500).json({ erro: "Erro ao buscar tipos de objeto" });  // Respondendo com erro
    }
    console.log('Resultados da consulta:', results);  // Exibindo resultados no servidor
    res.send("json(results)");  // Enviando resultados como JSON
  });
});

// routes/objeto.js
router.post("/salvar-codigo", (req, res) => {
    const { codigo, tipoObjeto, status, sala, complemento } = req.body;
  
    const sql = "INSERT INTO objeto (codigo, TipoObjeto_idTipoObjeto, status, sala, complemento) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [codigo, tipoObjeto, status, sala, complemento], (err, results) => {
      if (err) {
        console.error("Erro ao salvar objeto:", err);
        return res.status(500).json({ erro: "Erro ao salvar objeto" });
      }
      res.json({ mensagem: "Objeto cadastrado com sucesso!" });
    });
  });
  
module.exports = router; 
