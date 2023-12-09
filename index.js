// IMPORTAÇÃO DO MODULO EXPRESS
const express = require("express");

// INSTANCIA DO MODULO EXPRESS
const app = express();

// CONFIGURAÇÃO PARA O EXPRESS MANIPULAR JSON
app.use(express.json());

const connection = require("./database/database");

// IMPORTAÇÃO DA CONTROLLER DE PRODUTO
const produto = require("./controller/Produto");
app.use("/", produto);

// IMPORTAÇÃO DA CONTROLLER DE CATEGORIA
const categoria = require("./controller/Categoria");
app.use("/", categoria);




//ABRINDO UM SERVIDOR COM EXPRESS/SEMPRE NO FINAL DO CÓDIGO
app.listen(3000, ()=>{
    console.log('RODANDO EM: http://localhost:3000')
});