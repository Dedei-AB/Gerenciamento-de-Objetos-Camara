const mysql = require("mysql2");
const express = require("express")

const connection = mysql.createConnection({
    host: "localhost", // Endereço do seu servidor MySQL
    user: "root", // Usuário do banco de dados
    password: "Mudar@1234", // Senha do banco de dados
    database: "bancodeobjetos", // Nome do seu banco de dados
  });