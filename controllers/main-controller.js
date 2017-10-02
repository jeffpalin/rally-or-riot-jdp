var db = require('../models');

var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup');
}

exports.signin = function(req, res) {
    res.render('signin');
}

exports.signout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}

exports.landing = function(req, res) {
    res.render('landing', {user: req.user});
}

exports.explore = function(req, res) {
    res.render('explore', {user: req.user});
}

exports.profile = function(req, res) {
    var user = {
        username: req.user.username,
        profile: req.params.username
    }
    db.User.findOne({
        where: {
            username: user.profile
        }
    }).then(function(result) {
        user.email = result.email;
        user.profile = result.username; //verify it exists
        res.render('profile', {user: user});
    }).catch(function(err) {
        res.render(err)
    });
};
