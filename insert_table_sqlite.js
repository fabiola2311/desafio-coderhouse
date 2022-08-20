const { options } = require('./options/options_sqlite.js');
const knex = require('knex')(options);

const mensajes = [
    {
        email: "catiperri@gmail.com",
        text: "Kathy",
        time: "2022-08-18T02:17:28.754Z"
    }
]

//Tabla mensajes
knex('mensajes').insert(mensajes)
    .then(() => console.log("Mensajes insertados"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });