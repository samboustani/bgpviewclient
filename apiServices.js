'use strict';

app.factory('apiServices', ['$http', function($http) {

    var urlBase = 'https://api.bgpview.io';
    var apiServices = {};

    // Search results
    apiServices.search = function(queryTerm) {
        return $http.get(urlBase + '/search?query_term=' + queryTerm);
    };

    // ASN details
    apiServices.getAsnDetails = function(asn) {
        return $http.get('https://api.bgpview.io/asn/' + asn);
    };

    // ASN Prefixes
    apiServices.getAsnPrefixes = function(asn) {
        return $http.get('https://api.bgpview.io/asn/' + asn + '/prefixes');
    };

    // ASN Peers
    apiServices.getAsnPeers = function(asn) {
        return $http.get('https://api.bgpview.io/asn/' + asn + '/peers');
    };

    // ASN Upstreams
    apiServices.getAsnUpstreams = function(asn) {
        return $http.get('https://api.bgpview.io/asn/' + asn + '/upstreams');
    };

    // ASN Downstreams
    apiServices.getAsnDownstreams = function(asn) {
        return $http.get('https://api.bgpview.io/asn/' + asn + '/downstreams');
    };

    // ASN IXs
    apiServices.getAsnIXs = function(asn) {
        return $http.get('https://api.bgpview.io/asn/' + asn + '/ixs');
    };

    // Prefix details
    apiServices.getPrefixDetails = function(prefix) {
        return $http.get('https://api.bgpview.io/prefix/' + prefix);
    };

    // WhoIs
    apiServices.getWhoIs = function(asn) {
        return $http.get('https://rdap.arin.net/registry/autnum/' + asn);
        //console.log(response);
        //https://www.arin.net/resources/registry/whois/rdap/#rdap-urls
    };

    // IP details
    apiServices.getIPDetails = function(ip) {
        return $http.get('https://api.bgpview.io/ip/' + ip);
    };

    // IX details
    apiServices.getIXDetails = function(ix) {
        return $http.get('https://api.bgpview.io/ix/' + ix);
    };

    return apiServices;
}]);