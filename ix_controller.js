'use strict';

app.controller('ix', ['$scope', '$http', function($scope, $http) {

    
}])
.directive('ixDetails', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            getAsn: '&',
            getIp: '&'
        },
        link: function (scope, elm, attr) {
            scope.$watch('data', function(newValue, oldValue) {
            }, true);
        },
        templateUrl: 'ix.html'
    };
});