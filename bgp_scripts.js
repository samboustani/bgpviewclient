$( document ).ready(function() {

    // Set the upstreams graphs
    $('.upstream-graph').click(function(e) {
        var svgUrl = $(this).data('url');
        var vTarget = $(this).data('target');
        $.get(svgUrl, function( data ) {
            $(vTarget + ' .modal-body').html(data);
        }, 'text');
    });

    function initialiseExtra(hash) {
        hash = hash.replace('#', '');

        // Map specific hook
        if (hash == 'map' && $('#map').html() == '') {
            console.log('Initialise Map');
            initMap();
        }

        // Combined Graph specific hook
        if (hash == 'graph' && $('#content-graph h2').length > 0) {
            console.log('Initialise Combined Graph');
            initGraph();
        }

        // Execute the DNS loading
        if (hash == 'dns' && $('#dns').html() == '') {
            console.log('Initialise Domains');
            initDomains($('#dns').data('prefix'))
        }
    }

    function initGraph()
    {
        var svgUrl = $('#content-graph').data('combined-graph-url');
        $.get(svgUrl, function( data ) {
            $('#content-graph').html(data)
        }, 'text');
    }

    function initDomains(prefix)
    {
        // skip if prefix is not valid
        if (prefix.length < 1) {
            return;
        }
        var apiUrl = 'https://api.bgpview.io/prefix/' + prefix + '/dns';

        $.ajax({
            url: apiUrl,
            dataType: "json",
            error: function(xhr){
                console.log('API Call errored: ' + xhr.responseText)
                // #### TO-DO: Place a message in HTML
            },
            success: function(data){
                if (data.status == 'error') {
                    console.log('API Call errored: ' + data.status_message)
                    // #### TO-DO: Place a message in HTML
                }

                $('.loader').hide();
                var html =  '<div role="tabpanel" class="tab-pane active" id="table-dns">';
                html +=         '<table class="table table-hover">';
                html +=         '<tbody>';
                $.each(data.data, function( address, domains ) {
                    html +=         '<tr>';
                    html +=         '<td>' + address + '</td><td>';
                    $.each(domains, function( index, domain ) {
                        html +=     domain;
                        if (index + 1 !== domains.length) {
                            html += ', ';
                        }
                    });
                    html +=         '</td></tr>';
                });
                html +=         '</tbody>';
                html +=         '</div>';
                html +=     '</div>';

                $('#dns').html(html);
            },
            timeout: 10000
        });
    }

    // $(document).ready(function() {
    //     $('#countries-report').DataTable( {
    //         "paging":   false,
    //         "searching":     false,
    //         "processing": true,
    //         "info": false,
    //         "order": [[ 1, "desc" ]]
    //     });
    // } );

    // $(document).ready(function() {
    //     $('#country-report').DataTable( {
    //         "paging":   false,
    //         "searching":     false,
    //         "processing": true,
    //         "info": false,
    //         "order": [[ 4, "desc" ]]
    //     });
    // } );

});
