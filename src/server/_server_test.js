// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
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
exports.test_serverServesAFile = function(test) {
    var testDir = "generated/test";
    var testData = "This is served from a file";

    fs.writeFileSync(TEST_FILE, testData);
    server.start(TEST_FILE, 8080);
    http.get("http://localhost:8080", function (response) {
        var receivedData = false;

        test.equals(200, response.statusCode, "status code");
        response.setEncoding("utf8");
        response.on("data", function (chunk) {
            receivedData = true;
            test.equals(testData, chunk, "response text");
        });
        response.on("end", function () {
            test.ok(receivedData, "should have received response data");
            server.stop(function() {
                test.done();
            });

        });
    });
};

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

