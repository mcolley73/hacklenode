
function route(handle, pathname, response) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === "function") {
		handle[pathname](response);
	} else {
		console.log("No handler mapped for " + pathname);
		response.writeHead(404, {
			"Content-Type" : "text/plain"
		});
		response.write("Hell, I can getchya a 404 by 3 o'clock this afternoon. With nail polish.");
		response.end();
	}
}

exports.route = route;
