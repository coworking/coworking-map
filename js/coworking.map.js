(function($) { "use strict";
window.Coworking = {};
window.$Map = (
    window.Coworking.Map = function() { this.init(); }
).prototype = new Object();

$Map.metadata_url =
    'https://raw.github.com/coworking/coworking-metadata/master/metadata.jsonp';

$Map.init = function() {};

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
     
};

// Close  wrapper function and call it.
})(jQuery);
