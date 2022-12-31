const Gio = imports.gi.Gio;
let server = new Gio.SocketService({ listen_backlog: 8077 });
server.connect("notify::active", (server2, connection) => {
  print(`New connection from ${connection.get_name()}`);
  server2.connect("incoming", (connection2, message) => {
    print(`Received message: ${message.get_data()}`);
    server2.add_inet_port;
  });
});
server.start();
print("Server listening on port 8080");
