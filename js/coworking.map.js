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
    this.generate();
//     $.ajax({
//         'url': this.metadata_url,
//         'dataType': 'jsonp',
//         'crossDomain': true,
//         'jsonp': false
//     });
};

$Map.add_metadata = function(data) {
    this.metadata = data;
    this.generate();
};

$Map.generate = function() {
    console.log(1);
    var myLatlng = new google.maps.LatLng(39.397, -100.644);
    console.log(2);
    var myOptions = {
        zoom: 5
        ,center: myLatlng
//         ,mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log(3);
    var map = this.map =
        new google.maps.Map($('.map_canvas'), myOptions);
    console.log(4);

//     var geoXml = new geoXML3.parser({map: map});
//     geoXml.parse('../bgmm/chapter_09/state_capitals.kml');
};

// Close  wrapper function and call it.
})(jQuery);
