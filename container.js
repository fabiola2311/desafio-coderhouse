const { builtinModules } = require('module');
const knex = require('knex')

//Clase Container
class Container {

    constructor(configuracion, tabla) {
        this.knex = knex(configuracion)
        this.tabla = tabla
    }
    //Función para guardar un producto
    save(object) {
        this.knex(this.tabla).insert(object)
            .then(() => console.log(`Nuevo dato insertado a la tabla: ${this.tabla}`))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                this.knex.destroy();
            });
    }

    //Función para traer el listado de productos

    async getAll() {
        try {
            const datos = await this.knex.from(this.tabla).select('*')
            console.log(datos)
            this.knex.destroy()
            return datos
        } catch (error) {
            console.log(error)
        }
    }

    //Función para borrar el listado de productos
    deleteAll() {
        this.knex(this.tabla).del()
            .then(() => console.log(`Se eliminaron todos los datos de la tabla: ${this.tabla}`))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                this.knex.destroy();
            });
    }

    //Función para actualizar un producto según su id
    updateById(id, newProduct) {
        this.knex(this.tabla).where({ id }).update(newProduct)
            .then(() => console.log(`Se actualizó el dato de la tabla: ${this.tabla} con id=${id}`))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                this.knex.destroy();
            });
    }

    //Función para traer un producto de acuerdo con el id 
    getById(id) {
        this.knex.from(this.tabla).select('*').where({ id })
            .then((datos) => { return datos })
            .then(() => console.log(`Datos de la tabla: ${this.tabla} con id=${id}`))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                this.knex.destroy();
            });
    }

    //Función para borrar un producto de acuerdo con el id 
    deleteById(id) {
        this.knex(this.tabla).where({ id }).del()
            .then(() => console.log(`Se eliminó el dato de la tabla: ${this.tabla} con id=${id}`))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                this.knex.destroy();
            });
    }
}

module.exports = Container