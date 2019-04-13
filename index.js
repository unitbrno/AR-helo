var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

port = process.argv[2];

function mainroute(req, res){
    if (req.path == "/kbd")
    {
        res.sendFile(__dirname + '/src/keyboard.html')
        return;
    }
    res.sendFile(__dirname + '/src' + req.path);
  }

app.get('/*', mainroute);

io.on('connection', function(socket){
    console.log('an user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
          });
        socket.on('helo', function(helo){
            console.log(helo);
            io.emit('helo', helo);
        });
    });



http.listen(port, function(){
  console.log('listening on *:'+port);
});