
var asn_details;
var ip_prefixes;
var ip_peers;
var ip_upstreams;
var ip_downstreams;
var asn_ixs;

const load = () => {
    asn_details = document.getElementById('details');
    ip_prefixes = document.getElementById('prefixes');
    ip_peers = document.getElementById('peers');
    ip_upstreams = document.getElementById('upstreams');
    ip_downstreams = document.getElementById('downstreams');
    asn_ixs = document.getElementById('ixs');
}

const userAction = async() => {
    // 61138
    var response = null;
    var temp = null;
    var model = {
        asns: [],
        ipv4_prefixes: [],
        ipv6_prefixes: [],
        ipv4_peers: [],
        ipv6_peers: [],
        ipv4_upstreams: [],
        ipv6_upstreams: [],
        ipv4_downstreams: [],
        ipv6_downstreams: [],
        ixs: []
    };
    var search = document.getElementById('search');    

    if (isNaN(search)) {
        // text search
        response = await fetch('https://api.bgpview.io/search?query_term=' + search.value);
        temp = await response.json();
        model.asns = temp.data.asns;
        model.ipv4_prefixes = temp.data.ipv4_prefixes;
        model.ipv6_prefixes = temp.data.ipv6_prefixes;
    }
    else {
        if (search.value.toString().length === 5) {
            // ASN search
            response = await fetch('https://api.bgpview.io/asn/' + search.value);
            temp = await response.json();
            model.asns.push(temp.data);
        }        
    }

    // ASN details
    asn_details.innerText = JSON.stringify(model.asns[0]);

    // Prefixes
    if (model.ipv4_prefixes.length == 0) {
        response = await fetch('https://api.bgpview.io/asn/' + model.asns[0].asn + '/prefixes');
        temp = await response.json();
        model.ipv4_prefixes = temp.data.ipv4_prefixes;
        model.ipv6_prefixes = temp.data.ipv6_prefixes;
    }

    ip_prefixes.innerText = JSON.stringify(model.ipv4_prefixes) + JSON.stringify(model.ipv6_prefixes);
    
    // Peers
    response = await fetch('https://api.bgpview.io/asn/' + model.asns[0].asn + '/peers');
    temp = await response.json();
    model.ipv4_peers = temp.data.ipv4_peers;
    model.ipv6_peers = temp.data.ipv6_peers;
    ip_peers.innerText = JSON.stringify(model.ipv4_peers) + JSON.stringify(model.ipv6_peers);

    // Upstreams
    response = await fetch('https://api.bgpview.io/asn/' + model.asns[0].asn + '/upstreams');
    temp = await response.json();
    model.ipv4_upstreams = temp.data.ipv4_upstreams;
    model.ipv6_upstreams = temp.data.ipv6_upstreams;
    ip_upstreams.innerText = JSON.stringify(model.ipv4_upstreams) + JSON.stringify(model.ipv6_upstreams);

    // Downstreams
    response = await fetch('https://api.bgpview.io/asn/' + model.asns[0].asn + '/downstreams');
    temp = await response.json();
    model.ipv4_downstreams = temp.data.ipv4_downstreams;
    model.ipv6_downstreams = temp.data.ipv6_downstreams;
    ip_downstreams.innerText = JSON.stringify(model.ipv4_downstreams) + JSON.stringify(model.ipv6_downstreams);

    // IXs
    response = await fetch('https://api.bgpview.io/asn/' + model.asns[0].asn + '/ixs');
    temp = await response.json();
    model.ixs = temp.data;
    asn_ixs.innerText = JSON.stringify(model.ixs);
}
