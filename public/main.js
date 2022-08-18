const socket = io.connect();

//* Funciones para el Listado de Productos
//Esta función se encargará de imprimer los productos en el html
function render(productos) {
    const html = productos.map(({id,title,price,thumbnail}) => {
        return(`<tr>
        <th scope="row">${id}</th>
        <td>${title}</td>
        <td>${price}</td>
        <td><img src="${thumbnail}" alt="" style="width: 40px;"></td>
    </tr>`)
    }).join(" ")
    document.getElementById('productsTable').innerHTML = html;
}

//Función para tomar los valores de los inputs de los formularios

function inputsProducts(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', product);
    return false;
}

socket.on('productsTable', data => render(data));


//-------------------------- MENSAJES -----------------------------------

//* Función render
//Esta función se encargará de imprimer los mensajes en el html
function renderMessages(mensajes) {  
    const html = mensajes.map(({email, text,time}) => {
        return(`
        <li class="list-group-item">
        <strong class="text-primary">${email}</strong>
        <span class="text-danger">[${time}]: </span>
        <em class="text-success">${text}</em>
        </li>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html;
}

//* Función addMEssage
//Esta función se encarga de tomar el valor de los inputs 
function addMessage(e) {
    const mensaje = {
        email: document.getElementById('mail').value,
        text: document.getElementById('text').value,
        time: new Date() 
    };
    socket.emit('new-message', mensaje);
    return false;
}


socket.on('messages', data => renderMessages(data));
