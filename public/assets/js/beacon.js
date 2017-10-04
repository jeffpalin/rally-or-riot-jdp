//Beacon Creation
$('#beaconSubmit').on('click', function(event) {
    event.preventDefault();

    var newBeacon = {
        name: $('#name').val().trim(),
        activity: $('#activity').val().trim(),
        category: $('#category').val().trim()
    };

    submitBeacon(newBeacon);

    $('#name').val('');
    $('#activity').val('');
    $('#category').val('');
    $('#tags').val('');
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

    var beaconId = $(this).parent().attr('id');
    var rallyCount = $('#rallies-'+beaconId).html();
    var newRally = parseInt(rallyCount) + 1;

    var beaconRally = {
        id: beaconId,
        rallies: newRally
    }

    $.post('/beacon/rally', beaconRally)
    .done(function(data) {
        $('#rallies-'+beaconId).html(newRally);
    });
});

$('.riotBtn').on('click', function(event) {
    event.preventDefault();

    var beaconId = $(this).parent().attr('id');
    var riotCount = $('#riots-'+beaconId).html();
    var newRiot = parseInt(riotCount) + 1;

    var beaconRiot = {
        id: beaconId,
        riots: newRiot
    }

    $.post('/beacon/riot', beaconRiot)
    .done(function(data) {
        $('#riots-'+beaconId).html(newRiot);
    });
});

// // Beacon Voting
// function like(){
// 	likes++;
// 	calculateBar();
// }
// function dislike(){
// 	dislikes++;
// 	calculateBar();
// }
//
// //Calculates bar widths
// function calculateBar(){
// 	var total = likes+dislikes;
//
// 	var percentageLikes=(likes/total)*100;
// 	var percentageDislikes=(dislikes/total)*100;
//
// 	document.getElementById('likes').style.width=percentageLikes.toString()+"%";
// 	document.getElementById('dislikes').style.width=percentageDislikes.toString()+"%";
// }
//
// calculateBar();