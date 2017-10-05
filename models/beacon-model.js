module.exports = function(sequelize, DataTypes) {
    var Beacon = sequelize.define("Beacon", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rallies: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        riots: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        population: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        // ageMin: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // ageMax: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // gender: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        lat: {
            type: DataTypes.DECIMAL(16, 6)
        },
        lng: {
            type: DataTypes.DECIMAL(16, 6)
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Beacon;
};