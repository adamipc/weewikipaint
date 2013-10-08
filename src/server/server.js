// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function () {
    "use strict";

    var http = require("http");
    var fs = require("fs");

    var server;

    exports.start = function (homePageToServer, notFoundPageToServe, portNumber) {
        if (!portNumber) throw new Error("port number is required");

        server = http.createServer();
        server.on("request", function (request, response) {
            if (request.url === "/" || request.url === "/index.html") {
                response.statusCode = 200;
                serveFile(response, homePageToServer);
            }
            else {
                response.statusCode = 404;
                serveFile(response, notFoundPageToServe);
            }
        });
        server.listen(portNumber);
    };

    exports.stop = function (callback) {
        server.close(callback);
    };

    function serveFile(response, file) {
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            response.end(data);
        });
    }

}());