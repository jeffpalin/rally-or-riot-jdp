var cloudinary = require('cloudinary');
var cloudinary_cors = "https://" + request.headers.host + "/cloudinary_cors.html";
var url = require('url');
var url_parts = url.parse(request.url, true);
var query = url_parts.query;

var preloaded_file = new cloudinary.PreloadedFile(query.image_id);
if (preloaded_file.is_valid()) {
  photo.image_id = preloaded_file.identifier();
} else {
  throw("Invalid upload signature");
}

cloudinary.config({ 
    cloud_name: 'durbgdsd3', 
    api_key: '662772167884817', 
    api_secret: 'A3guhKeD4IvZHCMUASwjIhOy1s0' 
  });

  $(function() {
    if($.fn.cloudinary_fileupload !== undefined) {
      $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
    }
  });