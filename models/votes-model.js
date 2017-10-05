module.exports = function(sequelize, DataTypes) {
    var Vote = sequelize.define("Vote", {
        beacon_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rally: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        riot: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        canRally: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        canRiot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    return Vote;
};