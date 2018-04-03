// conectamos al cliente con el servidor de websockets y escuchamos el evento messages
var socket = io.connect("172.16.20.61:4200", { "forceNew": true });

// data contiene el array de mensajes que envía el servidor 
socket.on("messages", function(data) {
    render(data);
});

function render(data) { // se encarga de pintar los mensajes en index.html
    var html = data.map(function(elem, index) {
        return (`<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
            </div>`)
    }).join(" "); // separa los elementos del array con un espacio, si no, pinta una coma(,)

    document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
    var message = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value
    };

    // se recoge los valores de author y text para enviarlos al servidor por la siguiente función
    socket.emit("new-message", message);
    document.getElementById("texto").value = "";
    return false;
}