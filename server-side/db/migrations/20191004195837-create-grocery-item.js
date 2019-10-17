'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroceryItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groceryListID: {
        type: Sequelize.INTEGER,
        references: {
          model: "GroceryLists", 
          key: "id",
          as: "groceryListID"
        }
      },
      name: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      purchased: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: "Anywhere"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroceryItems');
  }
};