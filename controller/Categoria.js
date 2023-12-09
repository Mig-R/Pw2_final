
const express = require("express");

const categoriaModel = require("../model/Categoria");

const router = express.Router();

// ROTA DE INSERÇÃO DE CATEGORIA
router.post("/categoria/cadastrarCategoria", (req, res) => {

    let { nome_categoria, observacoes_categoria } = req.body;
    //console.log(nome_categoria);

    categoriaModel.create({ nome_categoria, observacoes_categoria })
        .then(
            () => {
                return res.status(201).json({
                    errorStatus: false,
                    messageStatus: "Categoria inserida!"
                });
            })

        .catch(
            (error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error
                });
            });

});

// ROTA DE LISTAGEM DE CATEGORIA
router.get("/categoria/listarCategoria", (req, res) => {
    categoriaModel.findAll()
        .then(
            (categorias) => {
                return res.status(200).json(categorias)
            }
        )
        .catch(
            (error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error
                });
            });
});

// ROTA DE BUSCA DE CATEGORIA POR ID
router.get('/categoria/listarID/:codigo_categoria', (req, res)=>{
    let {codigo_categoria} = req.params;

    categoriaModel.findByPk(codigo_categoria)
    .then(
        (categoria)=>{
            return res.status(200).json(categoria);
        }
    )
    .catch(
        (error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

// ROTA DE ALTERAR CATEGORIA
router.put('/categoria/alterarCategoria', (req, res)=>{
    let {codigo_categoria, nome_categoria} = req.body;

    categoriaModel.update(
        {nome_categoria},
        {where:{codigo_categoria}}
    )
    .then(
        ()=>{
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus: "Categoria do produto alterada!"
                }
            )
        }
    )
    .catch(
        (error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

// ROTA DE EXCLUSÃO DE CATEGORIA
router.delete('/categoria/excluirCategoria/:codigo_categoria', (req, res)=>{
    let {codigo_categoria} = req.params;

    categoriaModel.destroy(
        {where:{codigo_categoria}}
    )
    .then(
        ()=>{
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus: "Categoria do produto excluída!"
                }
            )
        }
    )
    .catch(
        (error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});


module.exports = router;