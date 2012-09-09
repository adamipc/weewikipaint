// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");

var server;

exports.start = function() {
    server = http.createServer();
    server.on("request", function(request, response) {
        response.end("Hello World");
    });
    server.listen(8080);    // TODO: Remove duplication of port number
};

exports.stop = function(callback) {
    server.close(callback);
};