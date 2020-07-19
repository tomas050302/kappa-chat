const express = require('express');
const path = require('path');
const { dirname } = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (request, response) => {
  response.render('index.html');
});

const messages = [];

io.on('connection', socket => {
  console.log(`Connected ${socket.id}`);

  socket.emit('previousMessages', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    console.log(messages);
    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen(3333);
