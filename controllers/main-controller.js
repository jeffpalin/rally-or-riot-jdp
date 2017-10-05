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
            location: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng
        }

        res.render('explore', beaconObj);
    });
}

exports.profile = function(req, res) {
    
    db.User.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(result) {
        db.Beacon.findAll({
            where: {
                user_id: req.params.username
            }
        }).then(function(result) {
            var user = {
                username: req.user.username,
                profile: req.params.username,
                beacon: result
            }
            res.render('profile', {user: user});
        })
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
        // res.redirect('/explore');
        res.json(results);
    });
}

exports.votes = function(req, res) {
    db.Beacon.findAll({attributes: ['id', 'rallies', 'riots']}).then(function(beacons) {
        db.Vote.findAll({attributes: ['beacon_id', 'canRally', 'canRiot'], where: {user_id: req.user.id}})
        .then(function(votes) {
            var response = {
                beacons: beacons,
                votes: votes
            }
            res.json(response);
        });
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
