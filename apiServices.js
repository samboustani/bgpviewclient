'use strict';

app.factory('apiServices', ['$http', function($http) {

    var urlBase = 'https://api.bgpview.io';
    var apiServices = {};

    // main search
    apiServices.search = function(queryTerm) {
        return $http.get(urlBase + '/search?query_term=' + queryTerm);
    };

    return apiServices;
}]);