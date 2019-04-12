'use strict';

app.controller('home', ['$scope', 'apiServices', function($scope, apiServices) {

    $scope.search = function() {
        apiServices.search($scope.queryTerm)
            .then(function (response) {
                $scope.data = response.data.data;
                $scope.showSearch = true;
            });
    };

}]);