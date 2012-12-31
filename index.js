
console.log("Requiring...");
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.helloWorld;
handle["/newGame"] = requestHandlers.newGame;
handle["/fire"] = requestHandlers.fire;

console.log("Starting server with router's route function and handler mappings...");
server.start(router.route, handle);
