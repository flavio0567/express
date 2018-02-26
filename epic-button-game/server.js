// ---- EPIC BUTTON GAME ------//
// Import express and path modules
var express = require("express");
var path = require("path");
// Create the express app
var app = express();
// Define static folder
app.use(express.static(path.join(__dirname+"/static")));
console.log( 'dirname:', __dirname+"/static");
// Setup ejs templating and define the views folder
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// Root to render the indes.ejs view
app.get('/', function(req, res) {
    res.render("index");
   })
   // Start Node server listening on port 8000.
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
// io variable and require scket
var io = require('socket.io').listen(server);
// io.socket.on line
io.sockets.on('connection', function (socket) {
  console.log('Client/socket is connect!');
  console.log('Cliente/socket id is: ', socket.id);
  socket.on('push_button', function (data) {
      console.log('data:', data);
      io.emit('update_counter', data);
  });
});