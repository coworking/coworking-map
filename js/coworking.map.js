(function($) { "use strict";
window.Coworking = {};
window.$Map = (
    window.Coworking.Map = function() { this.init(); }
).prototype = new Object();

$Map.metadata_url =
    'https://raw.github.com/coworking/coworking-metadata/master/metadata.jsonp';

$Map.init = function() {};

$Map.run = function() {
//     this.generate();return;
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
//     console.log(this.metadata);
//     var locations = [
//       ['Bondi Beach', -33.890542, 151.274856, 4],
//       ['Coogee Beach', -33.923036, 151.259052, 5],
//       ['Cronulla Beach', -34.028249, 151.157507, 3],
//       ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//       ['Maroubra Beach', -33.950198, 151.259302, 1]
//     ];
// 
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(39.397, -100.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    var metadata = this.metadata;
    for (var i = 0, l = metadata.length; i < l; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(metadata[i].geo.lat, metadata[i].geo.long),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(metadata[i].Name);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
};

// Close  wrapper function and call it.
})(jQuery);
