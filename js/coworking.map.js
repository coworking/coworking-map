(function($) { "use strict";
window.Coworking = {};
window.$Map = (
    window.Coworking.Map = function() { this.init(); }
).prototype = new Object();

$Map.metadata_url =
    'https://raw.github.com/coworking/coworking-metadata/master/metadata.jsonp';

$Map.init = function() {
};

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
    var Demo = {
        map: null,
        mapContainer: document.getElementById('mapContainer'),
        numMarkers: 40,
        markers: [],
        visibleInfoWindow: null,

        generateTriggerCallback: function(object, eventType) {
            return function() {
                google.maps.event.trigger(object, eventType);
            };
        },

        openInfoWindow: function(infoWindow, marker) {
            return function() {
                // Close the last selected marker before opening this one.
                if (Demo.visibleInfoWindow) {
                    Demo.visibleInfoWindow.close();
                }

                infoWindow.open(Demo.map, marker);
                Demo.visibleInfoWindow = infoWindow;
            };
        },

        clearMarkers: function() {
            for (var n = 0, marker; marker = Demo.markers[n]; n++) {
                marker.setVisible(false);
            }
        },

        generateRandomMarkers: function(center) {
            // Populate side bar.
            var avg = {
                lat: 0,
                lng: 0
            };

            Demo.clearMarkers();

            for (var n = 1; n <= Demo.numMarkers; n++) {
                var html = 'Opening marker #' + n;

                // Place markers on map randomly.
                var randX = Math.random();
                var randY = Math.random();
                randX *= (randX * 1000000) % 2 == 0 ? 1 : -1;
                randY *= (randY * 1000000) % 2 == 0 ? 1 : -1;
                var randLatLng = new google.maps.LatLng(
                        center.lat() + (randX * 0.1),
                        center.lng() + (randY * 0.1));
                var marker = new google.maps.Marker({
                    map: Demo.map,
                    title: 'Marker #' + n,
                    position: randLatLng,
                    draggable: true
                });
                Demo.markers.push(marker);

                // Create marker info window.
                var infoWindow = new google.maps.InfoWindow({
                    content: [
                        '<h3 style="">',
                        'Marker #' + n,
                        '</h3>',
                        'Located at:',
                        '<div style="font-size: 0.8em;">',
                        randLatLng.lat() + ', ' + randLatLng.lng(),
                        '</div>'
                    ].join(''),
                    size: new google.maps.Size(200, 80)
                });

                // Add marker click event listener.
                google.maps.event.addListener(
                        marker, 'click', Demo.openInfoWindow(infoWindow, marker));

                // Sum up all lat/lng to calculate center all points.
                avg.lat += randLatLng.lat();
                avg.lng += randLatLng.lng();
            }

            // Center map.
            Demo.map.setCenter(new google.maps.LatLng(
                    avg.lat / Demo.numMarkers, avg.lng / Demo.numMarkers));
        },

        init: function() {
            var firstLatLng = new google.maps.LatLng(37.4419, -122.1419);
            Demo.map = new google.maps.Map(Demo.mapContainer, {
                zoom: 12,
                center: firstLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }
    };

    google.maps.event.addDomListener(window, 'load', Demo.init, Demo);
};

// Close  wrapper function and call it.
})(jQuery);
