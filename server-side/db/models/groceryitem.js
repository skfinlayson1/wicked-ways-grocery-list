'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroceryItem = sequelize.define('GroceryItem', {
    groceryListID: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    purchased: DataTypes.BOOLEAN,
    location: {
      type: DataTypes.STRING,
      defaultValue: "Anywhere"
    }
  }, {});
  GroceryItem.associate = function(models) {
    // associations can be defined here
    GroceryItem.belongsTo(models.GroceryList, {
      foreignKey: "groceryListID"
    })

  };
  return GroceryItem;
};