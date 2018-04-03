// creamos una aplicación con express, que pasaremos a un servidor http y todo irá ligado al servidor
// websockets que creamos con socket.io

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// array de mensajes de prueba
var messages = [{
    author: "David",
    text: "Hola! qué tal?"
}, {
    author: "Jesús",
    text: "Muy bien, y tú?"
}, {
    author: "Paco",
    text: "A tope!"
}]


// Ahora necesitamos que el servidor de websockets, que lo tenemos en la variable io, esté atento a que realice
// una conexión. Eso lo logramos con io.on() y pasándole el mensaje connection. Dentro de éste método enviaremos
// el array de objetos mensaje con el evento message
io.on("connection", function(socket) {
    console.log("Un cliente se ha conectado");
    socket.emit("messages", messages); 
    // el evento messages lo recogemos en el fichero JS de la parte del cliente

    // el socket escucha el evento new-message y los datos que trae consigo los añade al array messages
    // con el método push
    socket.on("new-message", function(data) {
        messages.push(data);
    
        io.sockets.emit("messages", messages); // se comunica a TODOS los clientes el nuevo mensaje
    });
});

app.use(express.static("public")); // ruta de los ficheros estáticos

// puerto de escuchar del servidor
server.listen(4200, function() {
    console.log("Servidor corrriendo en http://localhost:4200");
});