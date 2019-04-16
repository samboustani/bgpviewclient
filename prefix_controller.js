'use strict';

app.controller('prefix', ['$scope', '$http', function($scope, $http) {

    
}])
.directive('prefixDetails', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: function (scope, elm, attr) {
            scope.$watch('data', function(newValue, oldValue) {
            }, true);
        },
        templateUrl: 'prefix.html'
    };
});