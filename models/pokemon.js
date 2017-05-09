"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pokemon = sequelize.define("Pokemon", {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Pokemon.belongsTo(models.Trainer)
      }
    }
  });

  return Pokemon;
};
