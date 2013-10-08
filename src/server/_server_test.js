// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var server = require("./server.js");
    var http = require("http");
    var fs = require("fs");
    var assert = require("assert");

    var TEST_HOME_PAGE = "generated/test/testHome.html";
    var TEST_404_PAGE = "generated/test/test404.html";

    exports.tearDown = function(done) {
        cleanUpFile(TEST_HOME_PAGE);
        cleanUpFile(TEST_404_PAGE);

        done();
    };

//TODO: move file cleanup to "teardown" method
    exports.test_serveHomePageFromFile = function(test) {
        var expectedData = "This is home page file";
        fs.writeFileSync(TEST_HOME_PAGE, expectedData);

        httpGet("http://localhost:8080", function(response, responseData) {
            test.equals(200, response.statusCode, "status code");
            test.equals(expectedData, responseData, "response text");
            test.done();
        });
    };


    exports.test_returns404FromFileForEverythingExceptHomePage = function(test) {
        var expectedData = "This is 404 page file";
        fs.writeFileSync(TEST_404_PAGE, expectedData);

        httpGet("http://localhost:8080/bargle", function(response, responseData) {
            test.equals(404, response.statusCode, "status code");
            test.equals(expectedData, responseData, "404 text");
            test.done();
        });
    };

    exports.test_returnsHomePageWhenAskedForIndex = function(test) {
        var testDir = "generated/test";
        fs.writeFileSync(TEST_HOME_PAGE, "foo");

        httpGet("http://localhost:8080/index.html", function(response, responseData) {
            test.equals(200, response.statusCode, "status code");
            test.done();
        });
    };

    exports.test_requiresHomePageParameter = function(test) {
        test.throws(function() {
            server.start();
        });
        test.done();
    };

    exports.test_requires404PageParameter = function(test) {
        test.throws(function() {
            server.start(TEST_HOME_PAGE);
        })    ;
        test.done();
    };
    exports.test_requiresPortNumber = function(test) {
        test.throws(function() {
            server.start(TEST_HOME_PAGE, TEST_404_PAGE);
        });
        test.done();
    };

    exports.test_runsCallbackWhenStopCompletes = function (test) {
        server.start(TEST_HOME_PAGE, TEST_404_PAGE, 8080);
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
        server.start(TEST_HOME_PAGE, TEST_404_PAGE, 8080);
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

    function cleanUpFile(file) {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            assert.ok(!fs.existsSync(file), "could not delete test file: [" + file + "]");
        }
    }
}());

