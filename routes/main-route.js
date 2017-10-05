var mainController = require('../controllers/main-controller.js');
var db = require('../models');

module.exports = function(app, passport) {

    // GET ROUTES
    app.get('/', mainController.landing);
    app.get('/signup', mainController.signup);
    app.get('/signin', mainController.signin);
    app.get('/signout', mainController.signout);
    app.get('/explore', isSignedIn, mainController.explore);
    app.get('/profile/:username?', isSignedIn, mainController.profile);

    app.get('/beacon/votes', mainController.votes);

    // POST ROUTES
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/explore',
        failureRedirect: '/signup'
    }));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/explore',
        failureRedirect: '/signin'
    }));

    app.post("/beacon/new", isSignedIn, mainController.beacon);
    app.post("/beacon/rally", isSignedIn, mainController.rally);
    app.post("/beacon/riot", isSignedIn, mainController.riot);

    function isSignedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

}