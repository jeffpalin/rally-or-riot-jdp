//Beacon Creation
$('document').ready(function() {
    $('select').material_select();
});

$('#beaconCreate').on('click', function(event){
    $('#beaconForm').toggle(400);
});



$('#beaconSubmit').on('click', function(event) {
    event.preventDefault();
    $('#loadingCard').toggle(400);
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
        $('#loadingCard').toggle(400);
        location.reload();
    });
}

//Beacon Voting
$('.rallyBtn').on('click', function(event) {
    event.preventDefault();

    var newVote = {
        id: $(this).parent().attr('id')
    }

    $('#rallyBtn-'+newVote.id).css('color', '#3498db');
    $('#riotBtn-'+newVote.id).css('color', '#000');

    $.post('/beacon/rally', newVote)
    .done(function(data) {
        console.log('Posted: ' + data);
    });
});

$('.riotBtn').on('click', function(event) {
    event.preventDefault();

    var newVote = {
        id: $(this).parent().attr('id')
    }

    let currentCount = $('#riots-'+newVote.id).val();

    $('#riotBtn-'+newVote.id).css('color', '#e74c3c');
    $('#rallyBtn-'+newVote.id).css('color', '#000');

    $.post('/beacon/riot', newVote)
    .done(function(data) {
        console.log('Posted: ' + data);
    });
});

// Periodically refresh votes
(function worker() {
  $.ajax({
    url: 'beacon/votes',
    success: function(response) {
        for(let beacon of response.beacons)
        {
            var rallies = beacon.rallies;
            var riots = beacon.riots;

            //Voting ratio bar
            var total = rallies+riots;
            var percRallies = (rallies/total)*100;
            var percRiots = (riots/total)*100;

            $('#rallies-'+beacon.id).css('width', percRallies.toString()+'%');
            $('#riots-'+beacon.id).css('width', percRiots.toString()+'%');
            $('#rallies-'+beacon.id).text(beacon.rallies + ' rallies');
            $('#riots-'+beacon.id).text(beacon.riots + ' riots');

            //Only render votes with real numbers
            if(rallies === 0 || rallies == null){$('#rallies-'+beacon.id).css('display', 'none');}
            else{$('#rallies-'+beacon.id).css('display', 'block');}

            if(riots === 0 || riots == null){$('#riots-'+beacon.id).css('display', 'none');}
            else{$('#riots-'+beacon.id).css('display', 'block');}
        }

        //Display already voted items as 'voted'
        for(let vote of response.votes)
        {
            if(vote.canRally && !vote.canRiot){
                $('#riotBtn-'+vote.beacon_id).css('color', '#e74c3c');
                $('#rallyBtn-'+vote.beacon_id).css('color', '#000');
            }
            else if(vote.canRiot && !vote.canRally){
                $('#rallyBtn-'+vote.beacon_id).css('color', '#3498db');
                $('#riotBtn-'+vote.beacon_id).css('color', '#000');
            }
        }
    },
    complete: function() {
      setTimeout(worker, 500);
    }
  });
})();

$('#catbtn').on('click', function(event) {
    event.preventDefault();
    $('#catdrop').toggle(400);
});