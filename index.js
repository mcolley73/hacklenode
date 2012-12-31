
console.log("requiring express...");
var express = require("express");

console.log("requiring requestHandlers...");
var requestHandlers = require("./requestHandlers");

console.log("declaring app...");
var app = express();

console.log("prepping static directories...");
app.use("/css", express.static("css"));

requestHandlers.configure(app);

console.log("listening...");
app.listen("1337");
