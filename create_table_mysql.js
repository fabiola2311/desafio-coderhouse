const { options } = require('./options/options_mysql.js');
const knex = require('knex')(options);

//Tabla Productos

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('name')
    table.integer('price')
    table.string('thumbnail')
})
    .then(() => console.log('Tabla de productos creados'))
    .catch(err => { console.log(err); throw err })
    .finally(() => { knex.destroy() })