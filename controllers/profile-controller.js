var db = require('../models');
var exports = module.exports = {};

exports.profile = function(req, res) {
    var user = {
        username: req.params.username
    }
    db.User.findOne({
        where: {
            username: user.username
        }
    }).then(function(result) {
        user.email = result.email;
        user.username = result.username;
        res.render('profile', {profile: user});
    }).catch(function(err) {
        res.render(err)
    });
};

