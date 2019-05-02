var http = require('http');
var os = require('os');
var hostname = os.hostname();
var handleRequest = function(request, response) {
  response.writeHead(200);
  response.end(" PG User is: " + process.env.POSTGRES_USER + "\n PG Host is :"+ process.env.POSTGRES_HOST +"\n PG Port is :"+ process.env.POSTGRES_PORT +"\n PG Database: "+ process.env.POSTGRES_DB +"\n" + "Hello! Welcome to this Application!\n" + "Hostname is : "+ hostname);
}
var www = http.createServer(handleRequest);
www.listen(8080);
console.log("Server is listening to 8080");