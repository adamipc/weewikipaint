// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.

// launch the server in same way it happens in production
// get a page
// confirm we got something

// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

//TODO: move file cleanup to "teardown" method
    exports.test_for_smoke = function(test) {
        runProcess("weewikipaint homepage.html 404.html 8080");


        test.done();
    };

    function runProcess(command) {
        
    }


}());

