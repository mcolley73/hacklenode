var http = require("http");
var url = require("url");

function start(route, handle){
	
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		route(handle, pathname, response);
		
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		response.end("Hello World\n");
	};
	
	http.createServer(onRequest).listen(1337, "127.0.0.1");
	console.log("Server running at http://127.0.0.1:1337/");	
}

exports.start = start;
