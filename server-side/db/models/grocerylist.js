'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroceryList = sequelize.define('GroceryList', {
    owner: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  GroceryList.associate = function(models) {
    // associations can be defined here

    GroceryList.hasMany(models.GroceryItem, {
      foreignKey: "groceryListID",
      as: "groceryitems"
    })
  };
  return GroceryList;
};