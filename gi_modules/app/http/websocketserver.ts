const Gio = imports.gi.Gio;

// Create a new websocket server on port 8080
let server = new Gio.SocketService({ listen_backlog:8077});

// Connect to the 'new-connection' signal to handle incoming connections
server.connect('notify::active', (server, connection) => {
  print(`New connection from ${connection.get_name()}`);

  // Connect to the 'message' signal to handle incoming messages
  server.connect('incoming', (connection, message) => {
    print(`Received message: ${message.get_data()}`);

    // Send a response back to the client
server.add_inet_port
  });
});

// Start listening for connections
server.start();
print('Server listening on port 8080');
