// Project import
const optionsProductos  = require('./options/options_mysql');
const optionsMensajes = require('./options/options_sqlite');

const Container = require('./container.js')

const productos = new Container(optionsProductos,'productos')
const mensajes = new Container(optionsMensajes,'mensajes')

// configuración del servidor
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Handlebar import
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

// Set engine
app.set('view engine', 'hbs')

// Set views directory
app.set('views', './views_hbs')

// Ruta de acceso a public y archivos estaticos
app.use(express.static('./public')); 

// Ruta del formulario de carga
app.get('/', (solicitud, respuesta) => {
    respuesta.render('formulario', { layout: 'index'})
})


//Conexión al servidor
const PORT = 3000;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`)
})

//Configuración del Socket
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    productos.getAll()
    .then(res => {
        socket.emit('productsTable',res )
    })

    socket.on('new-product', async data => {
        await productos.save(data);
        io.sockets.emit('productsTable', await productos.getAll());
    });

    mensajes.getAll()
    .then(res => {
        socket.emit('messages',res )
    })

    socket.on('new-message', async data => {
        await mensajes.save(data);
        io.sockets.emit('messages', await mensajes.getAll());
    });


})