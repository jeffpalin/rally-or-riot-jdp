var mainController = require('../controllers/main-controller.js');

module.exports = function(app, passport) {

    app.get('/signup', mainController.signup);
    app.get('/signin', mainController.signin);
    app.get('/signout', mainController.signout);
    app.get('/explore', isSignedIn, mainController.explore);
    app.get('/', mainController.landing);
    app.get('/profile/:username?', isSignedIn, mainController.profile);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/explore',
        failureRedirect: '/signup'
    }));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/explore',
        failureRedirect: '/signin'
    }));

    function isSignedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
}