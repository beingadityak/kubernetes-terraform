var http = require('http');
var os = require('os');
var hostname = os.hostname();
const { Pool } = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

var msg = ""

pgClient.connect((err, client, release) => {
  if (err) {
    msg = "Error acquiring client : " + err.stack
  }
  else {
    msg = "DB Connection successful"
  }
})

var handleRequest = function(request, response) {
  response.writeHead(200);
  response.end("Hello! Welcome to this Application!\n" + "Hostname is : "+ hostname);
}
var www = http.createServer(handleRequest);
www.listen(8080);
console.log("Server is listening to 8080");