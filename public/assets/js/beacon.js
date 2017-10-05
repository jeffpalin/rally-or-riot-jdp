//Beacon Creation
$('document').ready(function() {
    $('select').material_select();
});

$('#beaconCreate').on('click', function(event){
    $('#beaconForm').toggle(400);
});

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
        let currentCount = $('#rallies-'+newVote.id).val();
        $('#rallies-'+newVote.id).text(currentCount+1);
    });
});

$('.riotBtn').on('click', function(event) {
    event.preventDefault();

    var newVote = {
        id: $(this).parent().attr('id')
    }

    $.post('/beacon/riot', newVote)
    .done(function(data) {
        let currentCount = $('#riots-'+newVote.id).val();
        $('#riots-'+newVote.id).text(currentCount+1);
    });
});

+// function calculateBar(){
 +// 	var total = likes+dislikes;
 +//
 +// 	var percentageLikes=(likes/total)*100;
 +// 	var percentageDislikes=(dislikes/total)*100;
 +//
 +// 	document.getElementById('likes').style.width=percentageLikes.toString()+"%";
 +// 	document.getElementById('dislikes').style.width=percentageDislikes.toString()+"%";
 +// }

//Periodically refresh votes
(function worker() {
  $.ajax({
    url: 'beacon/votes',
    success: function(beacons) {
        for(let beacon of beacons)
        {
            var rallies = beacon.rallies;
            var riots = beacon.riots;

            //Voting ratio bar
            var total = rallies+riots;
            var percRallies = (rallies/total)*100;
            var percRiots = (riots/total)*100;

            $('#rallies-'+beacon.id).css('width', percRallies.toString()+'%');
            $('#riots-'+beacon.id).css('width', percRiots.toString()+'%');

            //Update vote count
            $('#rallies-'+beacon.id).text(beacon.rallies + ' rallies');
            $('#riots-'+beacon.id).text(beacon.riots + ' riots');

            //Only render votes with real numbers
            if(rallies === 0 || rallies == null)
            {
                $('#rallies-'+beacon.id).css('display', 'none');
            }
            else{
                $('#rallies-'+beacon.id).css('display', 'block');

            }

            if(riots === 0 || riots == null)
            {
                $('#riots-'+beacon.id).css('display', 'none');
            }
            else{
                $('#riots-'+beacon.id).css('display', 'block');
            }
        }
    },
    complete: function() {
      setTimeout(worker, 5000);
    }
  });
})();