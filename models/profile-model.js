var orm = require('../config/orm.js')

var profile = {
    create: function(cols, vals, cb) {
        orm.create('profile', cols, vals, function(res) {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.create('profile', cols, vals, function(res) {
            cb(res);
        });
    }
}