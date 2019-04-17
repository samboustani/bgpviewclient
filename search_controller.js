'use strict';

app.controller('search', ['$scope', '$http', function($scope, $http) {

    
}])
.directive('searchResults', function() {
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
        templateUrl: 'search_results.html'
    };
});