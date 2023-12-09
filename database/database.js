// IMPORTAÇÃO DO MÓDULO SEQUELIZE
const sequelize = require("sequelize");

//CRIANDO A CONEXÃO COM O BANCO DE DADOS
const connection = new sequelize(
    "atv_pw2", //NOME BD
    "root", //USUARIO DO BD
    "", //SENHA DO BD (NÃO NECESSÁRIA)
    {
        host: "localhost",
        port: "3307",
        dialect: "mysql",
        timezone: "-03:00"
    }
);

//CONEXÃO COM O BD
module.exports = connection;