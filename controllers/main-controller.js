var db = require('../models');
var geocoder = require('geocoder');
var geolocation = require('geolocation');

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
    db.Beacon.findAll({order: [['updatedAt', 'DESC']]}).then(function(result) {

        var beaconObj = {
            user: req.user,
            beacon: result,
            location: req.body.location
        }

        res.render('explore', beaconObj);
    });
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
        res.render('profile', {user: user});
    }).catch(function(err) {
        res.render(err)
    });
};

exports.beacon = function(req, res) {
    db.Beacon.create({
        user_id: req.user.id,
        name: req.body.name,
        activity: req.body.activity,
        category: req.body.category,
        population: 1,
        lat: req.body.lat,
        lng: req.body.lng,
        location: req.body.location
    }).then(function(results) {
        res.redirect('/explore');
    });
}

exports.rally = function(req, res) {
    db.Beacon
    .findOne({ where: { id: req.body.id } })
    .then(function(beacon) {
        db.Vote.findOrCreate({
            where: {
                beacon_id: beacon.id,
                user_id: req.user.id
            }
        }).spread((voter, created) => {
            if(created) {
                db.Beacon.update({
                    rallies: beacon.rallies + 1
                },{
                    where: {
                        id: beacon.id
                    }
                })
                .then(function(updated) {
                    db.Vote.update({
                        rally: true,
                        riot: false,
                        canRally: false,
                        canRiot: true
                    }, {
                        where: {
                            beacon_id: beacon.id,
                            user_id: req.user.id
                        }
                    })
                });
            }
            else {
                if(voter.canRally)
                {
                    db.Beacon.update({
                        rallies: beacon.rallies + 1,
                        riots: beacon.riots - 1
                    },{
                        where: {
                            id: beacon.id
                        }
                    })
                    .then(function(updated) {
                        db.Vote.update({
                            rally: true,
                            riot: false,
                            canRally: false,
                            canRiot: true
                        }, {
                            where: {
                                beacon_id: beacon.id,
                                user_id: req.user.id
                            }
                        })
                    });
                }
            }
        });
    })
}

exports.riot = function(req, res) {
    db.Beacon
    .findOne({ where: { id: req.body.id } })
    .then(function(beacon) {
        db.Vote.findOrCreate({
            where: {
                beacon_id: beacon.id,
                user_id: req.user.id
            }
        }).spread((voter, created) => {
            if(created) {
                db.Beacon.update({
                    riots: beacon.riots + 1
                },{
                    where: {
                        id: beacon.id
                    }
                })
                .then(function(updated) {
                    db.Vote.update({
                        rally: false,
                        riot: true,
                        canRally: true,
                        canRiot: false
                    }, {
                        where: {
                            beacon_id: beacon.id,
                            user_id: req.user.id
                        }
                    })
                });
            }
            else {
                if(voter.canRiot)
                {
                    db.Beacon.update({
                        rallies: beacon.rallies - 1,
                        riots: beacon.riots + 1
                    },{
                        where: {
                            id: beacon.id
                        }
                    })
                    .then(function(updated) {
                        db.Vote.update({
                            rally: false,
                            riot: true,
                            canRally: true,
                            canRiot: false
                        }, {
                            where: {
                                beacon_id: beacon.id,
                                user_id: req.user.id
                            }
                        })
                    });
                }
            }
        });
    })
}
