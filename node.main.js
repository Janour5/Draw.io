const http = require("http");
const fs = require("fs");
const port = 25535;
const ip = "106.55.106.166";

const sendResponse = (filename, statusCode, response) => {
		fs.readFile('./html/${filename}', (error, data) => {
			if (error) {
				response.statusCode = 500;
				response.setHeader("Content-Type", "text/plain");
				response.end("Oops!,internal error.");
			} else {
				response.statusCode = statusCode;
				response.setHeader("Content-Type", "text/html");
				response.end(data); 
		}
	});
};

const server = http.createServer((request, response) => {
	console.log(request.url, request.method);
	const method = request.method;
	const url = request.url;

	if (method === "GET") {
		const requestUrl = new URL(url,"http://${ip}:${port}");
		if (url === "/") {
			sendResponse("index.html", 200, response);
		} else if (url === "/about.html") {
			sendResponse("about.html", 200, response);
		} else {
			sendResponse("404.hmtl", 404, response);
		}
	} else {

	}
	response.end("Hello From node JS-peace!");
});



server.listen(port, ip, () => {
	console.log('Server is running at http://${ip}:${port}');
});

