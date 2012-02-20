(function($) { "use strict";
window.Coworking = {};
window.$Map = (
    window.Coworking.Map = function() { this.init(); }
).prototype = new Cog;

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
    console.log(data);
}

// Close  wrapper function and call it.
})(jQuery);
