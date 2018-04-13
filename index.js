// Require what we need
var http = require('http');

var getClientIp = function(req) {
	return (
		(
			req.headers['X-Forwarded-For'] ||
			req.headers['x-forwarded-for'] ||
			''
		).split(',')[0] || req.client.remoteAddress
	);
};

var getClientLanguage = function(req) {
	return req.headers['accept-language'].split(',')[0];
};

var getClientSoftware = function(req) {
	var ua = req.headers['user-agent'];
	re = /\((.*)\)/;
	return ua.match(re)[1];
};

var app = http.createServer(function(request, response) {
	// Build the answer
	var answer = {
		ipaddress: getClientIp(request),
		language: getClientLanguage(request),
		software: getClientSoftware(request)
	};

	// Send answer
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify(answer));
});

app.listen('2000');