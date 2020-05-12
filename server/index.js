require('dotenv').config()
var PORT = 8000


var express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors')
var app = express()

var http = require('http').Server(app)
var io = require('socket.io')(http, { serveClient: false })

var routes = require('./routes')
var handle = require('./handlers')

var clients = []

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', routes.auth)
app.use('/api/message', routes.message)

app.use(handle.notFound)
app.use(handle.errors)

io.on('connection', socket => {
    console.log('New user connected')

    socket.on('storeClientInfo', data => {
        var clientInfo = new Object();
        clientInfo.customId = data.customId;
        clientInfo.clientId = socket.id;
        clients.push(clientInfo);
    })

    socket.on('disconnect', data => {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var c = clients[i];
            if (c.clientId == socket.id) {
                clients.splice(i, 1);
                break;
            }
        }
    })
})

var server = http.listen(PORT, () => {
    console.log(`Server is running on PORT: ${server.address().port}`);
});

module.exports.io = io
module.exports.clients = clients