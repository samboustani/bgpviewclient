"use strict";

angular.module('customFilters', [])
.filter("formatSpeed", function() {
  return function(input) {
    var output = "";
    if (input < 1000) {
      output = input + " Mbps";
    } else if (input >= 1000) {
      output = input / 1000 + " Gbps";
    }
    return output;
  };
});

// _unknown