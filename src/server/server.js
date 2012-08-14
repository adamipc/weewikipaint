// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");

exports.start = function() {
    var server = http.createServer();
    server.listen(8080);    // TODO: Remove duplication of port number
};