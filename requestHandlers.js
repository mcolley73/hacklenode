
var fs = require("fs");
var ejs = require("ejs");

function configure(app){
	
	console.log("configuring requestHandlers...");
	
	app.get("/", function helloWorld(request, response){
		
		var helloWorldStr = fs.readFileSync("views/index.ejs", "utf8");
		//console.log(helloWorldStr + "\n\n");
		
		//console.log("Compiling...");
		//var helloWorldTemplate = ejs.compile(helloWorldStr, {debug:true});
		//console.log("\n\n");
		
		console.log("Hello World.");
		writeGoodHtmlResponse(response, ejs.render(helloWorldStr, {filename: "views/index.ejs", debug:false}));
	});
	
	app.get("/newGame", function newGame(request, response){
		console.log("New Game.");
		writeGoodTextPlainResponse(response, "Would you like to play a game?");
	});
	
	app.get("/fire", function fire(request, response){
		console.log("Fire!");
		writeGoodTextPlainResponse(response, "Fired!");
	});
	
}

function writeGoodHtmlResponse(response, content){
	writeGoodResponse(response, "text/html", content);
}

function writeGoodTextPlainResponse(response, content){
	writeGoodResponse(response, "text/plain", content);
}

function writeGoodResponse(response, contentType, content){
	response.writeHead(200, {
		"Content-Type" : contentType
	});
	response.end(content + "\n");
}

exports.configure = configure;
