(function($) { "use strict";
window.Coworking = {};
window.$Map = (window.Coworking.Map = function() {}).prototype = new Object();

$Map.metadata_url =
    'https://raw.github.com/coworking/coworking-metadata/master/metadata.jsonp';

$Map.run = function() {
    $.ajax({
        'url': this.metadata_url,
        'dataType': 'jsonp',
        'crossDomain': true,
        'jsonp': false
    });
};

$Map.add_metadata = function(data) {
    this.metadata = data;
    this.generate();
};

$Map.generate = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: new google.maps.LatLng(39.397, -100.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();

    var metadata = this.metadata;
    for (var i = 0, l = metadata.length; i < l; i++) {  
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(metadata[i].geo.lat, metadata[i].geo.long),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent('<a href="google.com">' + metadata[i].Name + '</a>');
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
};

// Close  wrapper function and call it.
})(jQuery);
