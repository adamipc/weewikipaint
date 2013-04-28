// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");
var fs = require("fs");

var server;

exports.start = function(htmlFileToServe, portNumber) {
    if (!portNumber) throw new Error("port number is required");

    server = http.createServer();
    server.on("request", function(request, response) {
        if (request.url === "/" || request.url === "/index.html") {
            fs.readFile(htmlFileToServe, function(err, data) {
                if (err) throw err; //TODO: fix me
                response.end(data);
            });
        }
        else {
            response.statusCode = 404;
            response.end();
        }
    });
    server.listen(portNumber);
};

exports.stop = function(callback) {
    server.close(callback);
};