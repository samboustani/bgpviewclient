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
})
.filter("countryUnknown", function() {
  return function(input) {
    if (input == '' || input == 'undefined')
      return '_unknown';

    return input;
  };
})
.filter("nullValue", function() {
  return function(input) {
    if (input == '' || input == null || input == 'undefined')
      return 'Unknown';

    return input;
  };
});