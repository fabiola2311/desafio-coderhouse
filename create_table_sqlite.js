const { options } = require('./options/options_sqlite.js');
const knex = require('knex')(options);

//Tabla Mensajes

knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('email')
    table.string('text')
    table.timestamp('time').defaultTo(knex.fn.now())
})
    .then(() => console.log('Tabla de mensajes creada'))
    .catch(err => { console.log(err); throw err })
    .finally(() => { knex.destroy() })