'use strict';

app.controller('asn', ['$scope', '$http', function($scope, $http) {

    $scope.tab = 'asn';
    
    $scope.showTab = function(tabId) {
        $scope.tab = tabId;
    }

}])
.directive('asnDetails', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: function (scope, elm, attr) {
            scope.$watch('data', function(newValue, oldValue) {
            }, true);
        },
        templateUrl: 'asn_details.html'
    };
});