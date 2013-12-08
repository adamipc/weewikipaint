// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.

// launch the server in same way it happens in production
// get a page
// confirm we got something

// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var child_process = require("child_process");
    var http = require("http");

//TODO: move file cleanup to "teardown" method
    exports.test_for_smoke = function(test) {
        runServer(["src/server/weewikipaint", "8080"]);
        setTimeout(function() {
            console.log("ran server");
            httpGet("http://localhost:8080", function(response, receivedData) {
                console.log("got file");
                test.done();
            });
        }, 1000);
    };

    function runServer(nodeArgs) {
        var process = child_process.spawn("node", nodeArgs);
    }

    // TODO: eliminate duplication w/ _server_test.js
    function httpGet(url, callback) {
        var request = http.get(url);

        request.on("response", function(response) {
            var receivedData = "";

            response.setEncoding("utf8");
            response.on("data", function (chunk) {
                receivedData += chunk;
            });
            response.on("end", function () {
                callback(response, receivedData);
            });
        });
    }
}());

