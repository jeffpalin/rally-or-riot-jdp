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

$('.rallyBtn').on('click', function(event) {
    event.preventDefault();
    var beacon_id = $(this).parent().attr('id');
    var rallyCount = $('#rallies-'+beacon_id).html();
    var newRally = parseInt(rallyCount)+1;

    console.log(newRally);

    // $.post('/beacon/rally', beacon)
    // .done(function(data) {
    //     //
    // });
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