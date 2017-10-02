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

        FILE: interests-model.js - Beacon table creation model

*******************************************************************************/

module.exports = function(sequelize, DataTypes) {
    var Interests = sequelize.define("Interests", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        interests: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Beacon;
};