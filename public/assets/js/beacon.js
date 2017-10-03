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