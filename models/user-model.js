module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,32]
        }
    },
    email: {
         type: DataTypes.STRING,
         validate: {
             isEmail: true
         }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
  return User;
};