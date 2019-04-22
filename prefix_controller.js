'use strict';

app.controller('prefix', ['$scope', '$http', function($scope, $http) {

    $scope.tab = 'info';
    
    $scope.showTab = function(tabId) {
        $scope.tab = tabId;
    }
    
}])
.directive('prefixDetails', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            getAsn: '&',
            getPrefix: '&'
        },
        link: function (scope, elm, attr) {
            scope.$watch('data', function(newValue, oldValue) {
            }, true);
        },
        templateUrl: 'prefix.html'
    };
});