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
    exports.test_serverServeHomePageFromFile = function(test) {
        var testDir = "generated/test";
        var testData = "This is served from a file";

        fs.writeFileSync(TEST_FILE, testData);

        httpGet("http://localhost:8080", function(response, responseData) {
            test.equals(200, response.statusCode, "status code");
            test.equals(testData, responseData, "response text");
            test.done();
        });
    };


    exports.test_serverReturns404ForEverythingExceptHomePage = function(test) {
        httpGet("http://localhost:8080/bargle", function(response, responseData) {
            test.equals(404, response.statusCode, "status code");
            test.done();
        });
    };

    exports.test_serverReturnsHomePageWhenAskedForIndex = function(test) {
        var testDir = "generated/test";
        var testData = "This is served from a file";

        fs.writeFileSync(TEST_FILE, testData);

        httpGet("http://localhost:8080/index.html", function(response, responseData) {
            test.equals(200, response.statusCode, "status code");
            test.done();
        });
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

    exports.test_serverRequiresFileToServe = function(test) {
        test.throws(function() {
            server.start();
        });
        test.done();
    };

    exports.test_serverRequiresPortNumber = function(test) {
        test.throws(function() {
            server.start(TEST_FILE);
        });
        test.done();
    };

    exports.test_serverRunsCallbackWhenStopCompletes = function (test) {
        server.start(TEST_FILE, 8080);
        server.stop(function() {
            test.done();
        });
    };

    exports.test_stopCalledWhenServerIsntRunningThrowsException = function(test) {
        test.throws(function() {
            server.stop();
        });
        test.done();
    };
}());

