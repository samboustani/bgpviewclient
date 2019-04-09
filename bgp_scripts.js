$( document ).ready(function() {

    // Auto grow textareas
    $('textarea').autogrow();

    // Check if we have a side nav and deal with the switches
    if ($('.side-nav').length > 0 || $('#results-tabs').length > 0) {
        // Select current page from nav
        var hash = window.location.hash;
        var table_hash = '#table-' + hash.replace('#', '')
        var plain_hash =  hash.replace('#', '').replace('-v4', '').replace('-v6', '');
        var nav_hash = '#nav-' + plain_hash;
        var content_hash = '#content-' + plain_hash;

        // If the id is in nav I will assume its in body content too
        if ($(nav_hash).length > 0) {
            $(nav_hash).addClass('selected');
            $(content_hash).removeClass('hidden');
        } else {
            $('.side-nav li a').first().addClass('selected');
            $('.resource-content .box').first().removeClass('hidden');
        }

        // This is used in order to display the current bootstrap v4/v6 tab
        $('#' + plain_hash + '-tabs a').click(function(e) {
            $(this).tab('show');
        });

        // store the currently selected tab in the hash value
        $("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
            var id = $(e.target).attr("href").substr(1);
            window.location.hash = id.replace('table-', '');

            // Adjust the main side-nav too
            $('.side-nav a.selected').attr('href', '#' + id.replace('table-', ''));
        });

        // deal with the content of the tabbed page (v4 and v6)
        $('#' + plain_hash + '-tabs a[href="' + table_hash + '"]').tab('show');

        initialiseExtra(hash);
    }

    // Change the clicked fields
    $('.side-nav a').click(function(e) {
        e.preventDefault();
        var hash = $(this).attr("href").substr(1);
        window.location.hash = hash;

        // De select all other side nav and select only one we clicked on
        $(this).addClass('selected').parent().siblings().find('a').removeClass('selected');
        var content_id = '#content-' + $(this).attr('id').replace('nav-', '');

        // Show content field we want to see and hide the rest
        $(content_id).removeClass('hidden').siblings('.box').addClass('hidden');

        initialiseExtra(hash);
    });

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

                console.log(data);
                $('#dns').html(html);

            },
            timeout: 10000
        });
    }

    $(document).ready(function() {
        $('#countries-report').DataTable( {
            "paging":   false,
            "searching":     false,
            "processing": true,
            "info": false,
            "order": [[ 1, "desc" ]]
        });
    } );

    $(document).ready(function() {
        $('#country-report').DataTable( {
            "paging":   false,
            "searching":     false,
            "processing": true,
            "info": false,
            "order": [[ 4, "desc" ]]
        });
    } );

});
