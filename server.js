// Project import
const Container = require('./container.js')
const productos = new Container("productos.txt")


// Express configuration
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Handlebar import
const handlebars = require('express-handlebars');

// App engine configuration
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views_hbs/layouts', // Main components or views
        partialsDir: __dirname + '/views_hbs/partials/' // Partial components
    })
)


//Selector
const engine = 'pug'


// Set engine
app.set('view engine', engine)

// Set views directory
app.set('views', `./views_${engine}`)

// Ruta de acceso a public
app.use('/static', express.static(__dirname + '/public'))


// Ruta del formulario de carga
app.get('/', (solicitud, respuesta) => {
    respuesta.render('formulario', { layout: 'index' })
})

// Ruta del listado de productos
app.get('/productos', async (solicitud, respuesta) => {
    try {
        const listadoProductos = await productos.getAll()
        const productsExist = listadoProductos.length>0
        respuesta.render('listadoDeProductos', { layout: 'index', productos: listadoProductos, productsExist })
    } catch (error) {
        console.log("Error:", error)
    }
})


//* Ruta /productos POST 
app.post('/productos', async (solicitud, respuesta) => {
    let newProduct = solicitud.body
    const idNewProduct = await productos.save(newProduct)
    newProduct = await productos.getById(idNewProduct)
    respuesta.redirect('/')
})


//Conexión al servidor
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`)
})
