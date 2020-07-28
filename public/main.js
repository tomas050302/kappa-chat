const socket = io('http://localhost:3333');

function renderMessage(message) {
  $('.messages').append(
    `<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`
  );
}

socket.on('previousMessages', messages => {
  messages.forEach(message => {
    renderMessage(message);
  });
});

socket.on('receivedMessage', message => {
  renderMessage(message);
});

$('#chat').submit(event => {
  event.preventDefault();

  const author = $('input[name=username').val();
  const message = $('input[name=message').val();

  if (author.length && message.length) {
    const messageObject = {
      author,
      message,
    };

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);

    $('input[name=message').val('');
  }
});
