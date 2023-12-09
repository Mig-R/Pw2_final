const express = require('express');
//IMPORTAÇÃO DOS PACOTES DO FIREBASE
const { initializeApp, FirebaseError } = require('firebase/app');

const { getStorage, ref, getDownloads, uploadBytes, listAll, deleteObject, getDownloadURL } = require('firebase/storage');

const app = express();
const router = express.Router();

const produto = require('../model/Produto');
const upload = require('../helpers/upload/uploadImagem');
const deleteImage = require('../helpers/upload/deleteImagem');

/*****FIREBASE - CONEXÃO E CONFIGURAÇÃO*****/
/*DADOS DE CONEXÃO COM O FIREBASE*/
const firebaseConfig = {
    apiKey: "AIzaSyBaaScb4whxJPo2LbO9CUX8Zja0YMboZdQ",
  authDomain: "upload-firebase-b9219.firebaseapp.com",
  projectId: "upload-firebase-b9219",
  storageBucket: "upload-firebase-b9219.appspot.com",
  messagingSenderId: "417582405706",
  appId: "1:417582405706:web:97821fe6d49de8c8cd6eb3",
  measurementId: "G-MEJ3LZ7NYP"
};

//INICIALIZAR O FIREBASE 
const firebaseApp = initializeApp(firebaseConfig);

//CONECTANDO COM O STORAGE
const storage = getStorage(firebaseApp);
// ROTA DE INSERÇÃO DE CATEGORIA
router.post('/produto/cadastrarProduto', upload.array('files', 1), (req, res) => {

    const { nome_produto, valor_produto, descricao_produto, codigo_categoria } = req.body;

    const files = req.files;

    let imagem_produto

    files.forEach(file => {
        
        const fileName = Date.now().toString() + '-' + file.originalname;
        const fileRef = ref(storage, fileName);

        uploadBytes(fileRef, file.buffer)
            .then(
                (snapshot) => {
                    imageRef = ref(storage, snapshot.metadata.name)
                    getDownloadURL(imageRef)
                        .then(
                            (urlFinal) => {

                                imagem_produto = urlFinal;
                                    
                                    produto.create(
                                        {
                                            nome_produto,
                                            valor_produto,
                                            imagem_produto,
                                            descricao_produto,
                                            codigo_categoria

                                        }
                                    ).then(
                                        () => {
                                            return res.status(201).json({
                                                erroStatus: false,
                                                mensagemStatus: 'Produto inserido!'
                                            });
                                        }
                                    ).catch((erro) => {
                                        return res.status(400).json({
                                            erroStatus: true,
                                            erroMensagem: erro
                                        });
                                    });
                                }
                        )
                }
            )
            .catch(
                (erro) => {
                    res.send('ERRO: ' + erro);
                }
            );
    });



});

router.get("/produto/listarProduto", (req, res) => {

    produto.findAll()
    .then((produtos) => {
        return res.status(200).json(produtos)
    }).catch((erro) => {
        return res.status(400).json({
            erroStatus: true,
            erroMensagem: erro
        });
    });
});

router.get('/produto/listarProdutoCodigo/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params

    produto.findByPk(codigo_produto)
        .then((produtos) => {
            return res.status(200).json(produtos);
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.put('/produto/alterarProduto', (req, res) => {

    const { nome_produto, valor_produto, imagem_produto , descricao_produto, codigo_categoria, codigo_produto } = req.body;



    /** UPDATE SEM IMAGEM **/
    produto.update(
        {
            nome_produto,
            valor_produto,
            imagem_produto,
            descricao_produto,
            codigo_categoria,

        },

        
        { where: { codigo_produto } }
    ).then(
        () => {
            return res.status(200).json({
                erroStatus: false,
                mensagemStatus: 'Produto alterado!'
            });
        }).catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });

});

router.delete('/produto/excluirProduto/:codigo_produto', (req, res) => {

    const { codigo_produto } = req.params;

    produto.findByPk(codigo_produto)
        .then(
            (produtos) => {
                // console.log('IMAGEM PEQUENA' + livro.imagem_peq);
                // console.log('IMAGEM GRANDE' + livro.imagem_grd);
                deleteImage(produtos.imagem_produto);

                produtos.destroy({
                    where: { codigo_produto }
                }).then(
                    () => {
                        return res.status(200).json({
                            erroStatus: false,
                            mensagemStatus: 'Produto excluído!'
                        });

                    }).catch((erro) => {
                        return res.status(400).json({
                            erroStatus: true,
                            erroMensagem: erro
                        });
                    });
            }
        )

});

module.exports = router;