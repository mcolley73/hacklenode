
var ejs = require("ejs");

function helloWorld(response){
	console.log("Hello World.");
	writeGoodTextPlainResponse(response, "Hey, now...");
}

function newGame(response){
	console.log("New Game.");
	writeGoodTextPlainResponse(response, "Would you like to play a game?");
}

function fire(response){
	console.log("Fire!");
	writeGoodTextPlainResponse(response, "Fired!");
}

function writeGoodTextPlainResponse(response, content){
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	response.end(content + "\n");
}

exports.helloWorld = helloWorld;
exports.newGame = newGame;
exports.fire = fire;
