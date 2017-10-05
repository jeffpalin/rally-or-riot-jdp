//Beacon Creation
$('#beaconSubmit').on('click', function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function(position){
        var activity = $('#activity').val().trim();
        var category = $('#category').val().trim();
        var name = $('#name').val().trim();

        function decodeLocation(position) {
            var apikey = 'AIzaSyAwORWZDYOjHiXTWvwdeW04ecXeBuM1uqM';
            var latlng = position.coords.latitude + ',' + position.coords.longitude;
            var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng +
                            '&result_type=street_address' + '&key=' + apikey;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                for (var i = 0; i < response.results.length; i++) {
                    var address = response.results[i].formatted_address;
                    if (address) {
                        var newBeacon = {
                            name: name,
                            activity: activity,
                            category: category,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            location: address
                        };
                        submitBeacon(newBeacon);
                        return;
                    }
                };
            });
        }
        decodeLocation(position);
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

//Beacon Voting
$('.rallyBtn').on('click', function(event) {
    event.preventDefault();

    var newVote = {
        id: $(this).parent().attr('id')
    }

    $.post('/beacon/rally', newVote)
    .done(function(data) {
        console.log(data);
    });
});

$('.riotBtn').on('click', function(event) {
    event.preventDefault();

    var newVote = {
        id: $(this).parent().attr('id')
    }

    $.post('/beacon/riot', newVote)
    .done(function(data) {
        console.log(data);
    });
});