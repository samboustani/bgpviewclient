'use strict';

app.controller('ip', ['$scope', '$http', function($scope, $http) {

    
}])
.directive('ipDetails', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: function (scope, elm, attr) {
            scope.$watch('data', function(newValue, oldValue) {
            }, true);
        },
        templateUrl: 'ip.html'
    };
});