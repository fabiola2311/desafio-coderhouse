const { options } = require('./options/options_mysql.js');
const knex = require('knex')(options);

const productos = [
    {
        name: "Corbata",
        price: "12",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/clothing-and-accessories-1/70/clothing_accesories_clothes_fabric-27-512.png"
    },
    {
        name: "Vestido ",
        price: "120",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/clothing-and-accessories-1/80/clothing_accesories_clothes_fabric-05-512.png"
    },
    {
        name: "Bufanda",
        price: "22",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/clothing-and-accessories-1/80/clothing_accesories_clothes_fabric-28-512.png"
    },
    {
        name: "Producto",
        price: "12",
        thumbnail: "https://cdn2.iconfinder.com/data/icons/clothing-and-accessories-1/70/clothing_accesories_clothes_fabric-27-512.png"
    }
]

//Tabla Productos
knex('productos').insert(productos)
    .then(() => console.log("Productos insertados"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });