'use strict';

app.controller('search', ['$scope', '$http', function($scope, $http) {

    $scope.model = {
        asns: [],
        ipv4prefixes: [],
        ipv6prefixes: []
    };

    $scope.model.asns = $scope.data.asns;
    $scope.model.ipv4prefixes = $scope.data.ipv4_prefixes;
    $scope.model.ipv6prefixes = $scope.data.ipv6_prefixes;


}])
.directive('searchResults', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'search_results.html'
    };
});