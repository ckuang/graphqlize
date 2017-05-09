"use strict";

module.exports = function(sequelize, DataTypes) {
  var Trainer = sequelize.define("Trainer", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Trainer.Pokemon = Trainer.hasMany(models.Pokemon);
;
      }
    }
  });

  return Trainer;
};
