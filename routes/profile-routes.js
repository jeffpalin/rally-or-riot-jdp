var profileController = require('../controllers/profile-controller.js');

module.exports = function(app) {
    app.get('/profile/:user?', profileController.profile);
}