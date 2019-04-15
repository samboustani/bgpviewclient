'use strict';

app.controller('home', ['$scope', 'apiServices', '$q', function($scope, apiServices, $q) {

    $scope.showIndex = true;
    $scope.showSearch = false;
    $scope.showDetails = false;

    $scope.search = function() {
        apiServices.search($scope.queryTerm)
            .then(function (response) {
                $scope.data = {
                    asns: [],
                    ipv4prefixes: [],
                    ipv6prefixes: []
                };
            
                $scope.data.asns = response.data.data.asns;
                $scope.data.ipv4prefixes = response.data.data.ipv4_prefixes;
                $scope.data.ipv6prefixes = response.data.data.ipv6_prefixes;
                
                $scope.showIndex = false;
                $scope.showSearch = true;
                $scope.showDetails = false;
            });
    };

    $scope.showAsn = function(asn) {
        $scope.asndata = {
            asn: {},
            asns: [],
            asn_ipv4addresses: 0,
            ipv4_prefixes: [],
            ipv6_prefixes: [],
            asn_ip4peers: [],
            asn_ip6peers: [],
            asn_ip4upstreams: [],
            asn_ip4upstream_graph: '',
            asn_ip6upstreams: [],
            asn_ip6upstream_graph: '',
            asn_upstreams_graph: '',
            asn_ip4downstreams: [],
            asn_ip6downstreams: []
        };

        $scope.asndata.asn_ipv4addresses = $scope.data.ipv4prefixes.length;

        populate(asn);
    };

    function populate(asn) {
        $q.all([
            getAsnDetails(asn), 
            getAsnPrefixes(asn), 
            getAsnPeers(asn), 
            getAsnUpstreams(asn), 
            getAsnDownstreams(asn) //getWhoIs(asn)
        ]).then(function(data) {
            $scope.showIndex = false;
            $scope.showSearch = false;
            $scope.showDetails = true;
        });
    }

    function getAsnDetails(asn) {
        var d = $q.defer();
        apiServices.getAsnDetails(asn)
            .then(function (response) {
                $scope.asndata.asn = response.data.data;
                $scope.asndata.asn.rir_allocation.date_allocated = new Date($scope.asndata.asn.rir_allocation.date_allocated.replace(/-/g,"/"));
                d.resolve(true);
            });
            return d.promise;
    }

    function getAsnPrefixes(asn) {
        var d = $q.defer();
        apiServices.getAsnPrefixes(asn)
            .then(function (response) {
                $scope.asndata.ipv4_prefixes = response.data.data.ipv4_prefixes;
                $scope.asndata.ipv6_prefixes = response.data.data.ipv6_prefixes;
                d.resolve(true);
            });
            return d.promise;
    }

    function getAsnPeers(asn) {
        var d = $q.defer();
        apiServices.getAsnPeers(asn)
            .then(function (response) {
                $scope.asndata.asn_ip4peers = response.data.data.ipv4_peers;
                $scope.asndata.asn_ip6peers = response.data.data.ipv6_peers;
                d.resolve(true);
            });
            return d.promise;
    }

    function getAsnUpstreams(asn) {
        var d = $q.defer();
        apiServices.getAsnUpstreams(asn)
            .then(function (response) {
                $scope.asndata.asn_ip4upstreams = response.data.data.ipv4_upstreams;
                $scope.asndata.asn_ip6upstreams = response.data.data.ipv6_upstreams;
                $scope.asndata.asn_ip4upstream_graph = response.data.data.ipv4_graph;
                $scope.asndata.asn_ip6upstream_graph = response.data.data.ipv6_graph;
                $scope.asndata.asn_upstreams_graph = response.data.data.combined_graph;
                d.resolve(true);
            });
            return d.promise;
    }

    function getAsnDownstreams(asn) {
        var d = $q.defer();
        apiServices.getAsnDownstreams(asn)
            .then(function (response) {
                $scope.asndata.asn_ip4downstreams = response.data.data.ipv4_downstreams;
                $scope.asndata.asn_ip6downstreams = response.data.data.ipv6_downstreams;
                d.resolve(true);
            });
            return d.promise;
    }

    function getWhoIs(asn) {
        apiServices.getWhoIs(asn)
            .then(function (response) {
                //console.log(response);
                //https://www.arin.net/resources/registry/whois/rdap/#rdap-urls
            });
    }

}]);