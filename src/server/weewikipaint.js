// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function() {
   "use strict";

    var server = require("./server.js");
    server.start("homepage.html", "404.html", 8080);
}());