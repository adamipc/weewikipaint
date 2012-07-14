// Copyright (c) 2012 Adam Wendt Consulting. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var assert = require("assert");

exports.testNothing = function(test) {
    assert.equal(3, server.number(), "number");
    test.done();
};