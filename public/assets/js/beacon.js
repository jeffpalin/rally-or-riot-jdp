$('#beaconSubmit').on('click', function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);

        var newBeacon = {
            name: $('#name').val().trim(),
            activity: $('#activity').val().trim(),
            category: $('#category').val().trim(),
            lat: position.coords.latitude,
            lng: position.coords.longitude
            // location: decodeLocation()
        };
        console.log(newBeacon);
        submitBeacon(newBeacon);
        // function decodeLocation() {
        //     var apikey = 'AIzaSyAwORWZDYOjHiXTWvwdeW04ecXeBuM1uqM';
        //     var latlng = position.coords.latitude + position.coords.longitude;
        //     var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng +
        //                     '&result_type=street_address' + '&key=' + apikey;
        //     $.ajax({
        //         url: queryURL,
        //         method: 'GET'
        //     }).done(function(response) {
        //         for (var i = 0; i < response.results.length; i++) {
        //             var address = response.results[i].formatted_address;
        //             console.log(address);
        //             return address;
        //         };
        //     });
        // }
        
        $('#name').val('');
        $('#activity').val('');
        $('#category').val('');
        $('#tags').val('');
    });
});

function submitBeacon(beacon)
{
    $.post('/beacon/new', beacon)
    .done(function(data) {
        $('#beaconForm').toggle();
    });
}

// function populateLocationWidget(pos) {
//     var google_places_api_key = 'AIzaSyAwORWZDYOjHiXTWvwdeW04ecXeBuM1uqM';
//     // Structure URL
//     var latlng = pos.lat + ',' + pos.lng;
//     var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
//         latlng + '&result_type=street_address' + '&key=' + google_places_api_key;
//     $.ajax({
//         url: queryURL,
//         method: 'GET'
//     }).done(function (response) {
//         // Loop through JSON object to retrieve desired response result
//         for (var i = 0; i < response.results.length; i++) {
//             // Define address using JSON object
//             var address = response.results[i].formatted_address;
//             // Write address to page
//             $('#location').html(address);
//         }
//     });
// }

