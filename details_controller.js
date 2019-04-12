'use strict';

app.controller('details', ['$scope', '$http', '$filter', 'apiServices', function($scope, $http, apiServices) {

    $scope.queryTerm = "";

    $scope.model = {
        asn: {},
        asns: [],
        asn_ip4prefixes: [],
        asn_ip6prefixes: [],
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
        
    $scope.search = function() {
        var response = apiServices.search($scope.queryTerm);

        $scope.model.asns = response.asns;
        $scope.model.ipv4_prefixes = response.ipv4_prefixes;
        $scope.model.ipv6_prefixes = response.ipv6_prefixes;

        populate($scope.model.asns[0].asn);
    };

    function populate(asn) {
        getAsnDetails(asn);
        getAsnPrefixes(asn);
        getAsnPeers(asn);
        getAsnUpstreams(asn);
        //getAsnDownstreams(asn);
        getWhoIs(asn);
    }

    function getAsnDetails(asn) {
        $http.get('https://api.bgpview.io/asn/' + asn).success(function (response) {
            $scope.model.asn = response.data;
            $scope.model.asn.rir_allocation.date_allocated = new Date($scope.model.asn.rir_allocation.date_allocated.replace(/-/g,"/"));
        })
    }

    function getAsnPrefixes(asn) {
        $http.get('https://api.bgpview.io/asn/' + asn + '/prefixes').success(function (response) {
            $scope.model.asn_ip4prefixes = response.data.ipv4_prefixes;
            $scope.model.asn_ip6prefixes = response.data.ipv6_prefixes;
        })
    }

    function getAsnPeers(asn) {
        $http.get('https://api.bgpview.io/asn/' + asn + '/peers').success(function (response) {
            $scope.model.asn_ip4peers = response.data.ipv4_peers;
            $scope.model.asn_ip6peers = response.data.ipv6_peers;
        })
    }

    function getAsnUpstreams(asn) {
        $http.get('https://api.bgpview.io/asn/' + asn + '/upstreams').success(function (response) {
            $scope.model.asn_ip4upstreams = response.data.ipv4_upstreams;
            $scope.model.asn_ip6upstreams = response.data.ipv6_upstreams;
            $scope.model.asn_ip4upstream_graph = response.data.ipv4_graph;
            $scope.model.asn_ip6upstream_graph = response.data.ipv6_graph;
            $scope.model.asn_upstreams_graph = response.data.combined_graph;
        })
    }

    function getAsnDownstreams(asn) {
        $http.get('https://api.bgpview.io/asn/' + asn + '/downstreams').success(function (response) {
            $scope.model.asn_ip4downstreams = response.data.ipv4_downstreams;
            $scope.model.asn_ip6downstreams = response.data.ipv6_downstreams;
        })
    }

    function getWhoIs(asn) {
        $http.get('https://rdap.arin.net/registry/autnum/' + asn).success(function (response) {
            //console.log(response);
            //https://www.arin.net/resources/registry/whois/rdap/#rdap-urls
        })
    }


}]);