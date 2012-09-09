// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function(done) {
    server.stop(function() {
        done();
    });
};

// TODO: handle case where stop() is called before start()
// TODO: test-drive stop() callback

exports.test_serverReturnsHelloWorld = function(test) {
    server.start(8080);
    http.get("http://localhost:8080", function(response) {
        var receivedData = false;

        test.equals(200, response.statusCode, "status code");
        response.setEncoding("utf8");
        response.on("data", function(chunk) {
            receivedData = true;
            test.equals("Hello World", chunk, "response text");
        });
        response.on("end", function() {
            test.ok(receivedData, "should have received response data");
            test.done();
        });
    });
};

