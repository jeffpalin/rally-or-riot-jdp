var userController = require('../controllers/user-controller.js');

module.exports = function(app, passport) {

    app.get('/signup', userController.signup);
    app.get('/signin', userController.signin);
    app.get('/signout', userController.signout);
    app.get('/explore', isSignedIn, userController.explore);
    
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