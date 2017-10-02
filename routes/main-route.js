var mainController = require('../controllers/main-controller.js');

module.exports = function(app) {
    app.get('/', mainController.landing);
}