const { initializeApp } = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');

/* DADOS DE ACESSO AO FIREBASE */
const firebaseConfig = {
    apiKey: "AIzaSyBaaScb4whxJPo2LbO9CUX8Zja0YMboZdQ",
  authDomain: "upload-firebase-b9219.firebaseapp.com",
  projectId: "upload-firebase-b9219",
  storageBucket: "upload-firebase-b9219.appspot.com",
  messagingSenderId: "417582405706",
  appId: "1:417582405706:web:97821fe6d49de8c8cd6eb3",
  measurementId: "G-MEJ3LZ7NYP"
};

/* INICIALIZAÇÃO DO FIREBASE */
const firebaseApp = initializeApp(firebaseConfig);

/* INICIALIZAÇÃO DO STORAGE DO FIREBASE */
const storage = getStorage(firebaseApp);

const deleteImage = (imagem) => {

    const deleteRef = ref(storage, imagem);

    deleteObject(deleteRef)
        .then(() => {
            console.log('IMG EXCLUIDA!');
        })
        .catch((error) => {
            console.log('ERRO a imagem não foi excluida ):');
        });

}

module.exports = deleteImage;