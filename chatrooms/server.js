// ---- EPIC BUTTON GAME ------//
// Import express and path modules
var express = require("express");
var path = require("path");
// Create the express app
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session')
app.use(cookieParser());
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));
// Define static folder
app.use(express.static(path.join(__dirname, "/static")));
// Setup ejs templating and define the views folder
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// Root to render the indes.ejs view
app.get('/', function(req, res) {
    sessionID = req.sessionID;
    console.log('sessionID: ', sessionID);
    res.render("index");
   })

// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
    console.log("listening on port 8000");});

// io variable and require scket
var io = require('socket.io').listen(server);
users = [];
connections = [];

// io.socket.on line
io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Client/socket is connect: ', socket.id);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('new user', function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
        io.sockets.emit('get users', users);
    };

    socket.on('disconnect', function(data) {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, user: socket.username});  
    });


});