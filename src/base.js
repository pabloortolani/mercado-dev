
const config = {
    apiKey: "AIzaSyCpEqJecF17WKCB8yeBxvekLsp4R1cECSA",
    authDomain: "mercadodev-30cdc.firebaseapp.com",
    databaseURL: "https://mercadodev-30cdc.firebaseio.com",
    projectId: "mercadodev-30cdc",
    storageBucket: "gs://mercadodev-30cdc.appspot.com", // Endereço do Host (Storage)
    messagingSenderId: "864157553935",
    appId: "1:864157553935:web:ec31e3b65f5c034c399a7a"
};

//Importa o rebase = instala com o comando "yarn add re-base"
const Rebase = require('re-base');
//Importa o firebase = instala com o comando "yarn add firebase"
const firebase = require('firebase/app');
require('firebase/database');

require('firebase/storage')

//Cria um novo app no firebase
const app = firebase.initializeApp(config);
//Linka o App com o re-base
const base = Rebase.createClass(app.database());

//Exporta o Storage
export const storage = app.storage();

export default base;