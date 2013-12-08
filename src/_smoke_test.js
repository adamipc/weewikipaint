// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.

// launch the server in same way it happens in production
// get a page
// confirm we got something

// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var child_process = require("child_process");

//TODO: move file cleanup to "teardown" method
    exports.test_for_smoke = function(test) {
        var command = "node weewikipaint 8080";
        child_process.exec(command, function(error, stdout, stderr) {
            if (error !== null) {
                console.log(stdout);
                console.log(stderr);
                throw error;
            }
            test.done();
        });
    };

}());

