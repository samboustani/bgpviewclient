'use strict';

app.controller('home', ['$scope', 'apiServices', '$q', function($scope, apiServices, $q) {

    $scope.showIndex = true;
    $scope.showSearch = false;
    $scope.showASN = false;
    $scope.showPrefix = false;
    $scope.showIP = false;

    $scope.search = function() {

        if (isIp($scope.queryTerm)) {
            // 173.239.196.0
            // 2606:f180::
            $scope.getIP($scope.queryTerm);
        }
        else if (isPrefix($scope.queryTerm)) {
            // 173.239.196.0/24
            // 2606:f180::/48
            $scope.getPrefix($scope.queryTerm);
        }
        else {
            // logicweb
            if ($scope.queryTerm.startsWith('as')) {
                $scope.queryTerm = $scope.queryTerm.substring(2);
            }
    
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
                    $scope.showASN = false;
                    $scope.showPrefix = false;
                    $scope.showIP = false;
                });
        }
    };

    function isIp(query) {
        if (query.match("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$")
        || query.match("((^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))")) {
            return true;
        }
        return false;
    }

    function isPrefix(query) {
        if (query.match("^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$")
        || query.match("^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$")) {
            return true;
        }
        return false;
    }

    $scope.getPrefix = function(ip) {
        $scope.prefixdata = {};

        $scope.showIndex = false;
        $scope.showSearch = false;
        $scope.showASN = false;
        $scope.showPrefix = true;
        $scope.showIP = false;
    };

    $scope.getIP = function(ip) {
        $scope.ipdata = {};

        $scope.showIndex = false;
        $scope.showSearch = false;
        $scope.showASN = false;
        $scope.showPrefix = false;
        $scope.showIP = true;
    };

    $scope.getAsn = function(asn) {
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
            $scope.showASN = true;
            $scope.showPrefix = false;
            $scope.showIP = false;
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