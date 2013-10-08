// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var server = require("./server.js");
    var http = require("http");
    var fs = require("fs");
    var assert = require("assert");

    var TEST_FILE = "generated/test/test.html";

    exports.tearDown = function(done) {
        if (fs.existsSync(TEST_FILE)) {
            fs.unlinkSync(TEST_FILE);
            assert.ok(!fs.existsSync(TEST_FILE), "could not delete test file: [" + TEST_FILE + "]");
        }
        done();
    };

//TODO: move file cleanup to "teardown" method
    exports.test_serveHomePageFromFile = function(test) {
        var testDir = "generated/test";
        var expectedData = "This is served from a file";

        fs.writeFileSync(TEST_FILE, expectedData);

        httpGet("http://localhost:8080", function(response, responseData) {
            test.equals(200, response.statusCode, "status code");
            test.equals(expectedData, responseData, "response text");
            test.done();
        });
    };


    exports.test_returns404ForEverythingExceptHomePage = function(test) {
        httpGet("http://localhost:8080/bargle", function(response, responseData) {
            test.equals(404, response.statusCode, "status code");
            test.done();
        });
    };

    exports.test_returnsHomePageWhenAskedForIndex = function(test) {
        var testDir = "generated/test";
        fs.writeFileSync(TEST_FILE, "foo");

        httpGet("http://localhost:8080/index.html", function(response, responseData) {
            test.equals(200, response.statusCode, "status code");
            test.done();
        });
    };

    exports.test_requiresFileParameter = function(test) {
        test.throws(function() {
            server.start();
        });
        test.done();
    };

    exports.test_requiresPortNumber = function(test) {
        test.throws(function() {
            server.start(TEST_FILE);
        });
        test.done();
    };

    exports.test_runsCallbackWhenStopCompletes = function (test) {
        server.start(TEST_FILE, 8080);
        server.stop(function() {
            test.done();
        });
    };

    exports.test_stopThrowsExceptionWhenNotRunning = function(test) {
        test.throws(function() {
            server.stop();
        });
        test.done();
    };

    function httpGet(request, callback) {
        server.start(TEST_FILE, 8080);
        http.get(request, function (response) {
            var responseData = "";

            response.setEncoding("utf8");
            response.on("data", function (chunk) {
                responseData += chunk;
            });
            response.on("end", function () {
                server.stop(function() {
                    callback(response, responseData);
                });
            });
        });
    }
}());

