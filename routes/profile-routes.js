var profileController = require('../controllers/profile-controller.js');

module.exports = function(app, passport) {
    app.get('/profile/:username?', profileController.profile);
}
