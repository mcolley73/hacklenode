
console.log("requiring express...");
var express = require("express");

console.log("requiring requestHandlers...");
var requestHandlers = require("./requestHandlers");

console.log("declaring app...");
var app = express();

requestHandlers.configure(app);

console.log("listening...");
app.listen("1337");

/**
console.log("Requiring...");
var server = require("./server");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.helloWorld;
handle["/newGame"] = requestHandlers.newGame;
handle["/fire"] = requestHandlers.fire;

console.log("Starting server with router's route function and handler mappings...");
server.start(router.route, handle);
**/