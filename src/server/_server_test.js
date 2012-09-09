// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function(test) {
    server.stop(function() {
        console.log("stop callback");
    });
};

// TODO: handle case where stop() is called before start()
// TODO: test-drive stop() callback

exports.testHttpServer = function(test) {
    server.start();
    http.get("http://localhost:8080", function(response) {
        test.done();
    });
};
