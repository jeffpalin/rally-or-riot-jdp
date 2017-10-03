/********************************************************************************
      ."".    ."",       ____        ____                       ____  _       __
      |  |   /  /       / __ \____ _/ / /_  __   ____  _____   / __ \(_)___  / /_
      |  |  /  /       / /_/ / __ `/ / / / / /  / __ \/ ___/  / /_/ / / __ \/ __/
      |  | /  /       / _, _/ /_/ / / / /_/ /  / /_/ / /     / _, _/ / /_/ / /_
      |  |/  ;-._    /_/ |_|\__,_/_/_/\__, /   \____/_/     /_/ |_/_/\____/\__/
      }  ` _/  / ;                   /____/
      |  /` ) /  /
      | /  /_/\_/\   (c) 2017 Rally or Riot
      |/  /      |   Project authored by:
      (  ' \ '-  |   - Dayton Mills
       \    `.  /    - Jeanelle Sebastion
        |      |     - Jeff Palin
        |      |     - Nick Saponaro
        |      |     - Rowinn Dionisio

        FILE: beacon-model.js - Beacon table creation model

*******************************************************************************/

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
            allowNull: true
        },
        ageMin: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ageMax: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lat: {
            type: DataTypes.DECIMAL(16, 6)
        },
        lng: {
            type: DataTypes.DECIMAL(16, 6)
        }
    });
    return Beacon;
};