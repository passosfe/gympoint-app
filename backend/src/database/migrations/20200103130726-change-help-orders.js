'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.changeColumn('help_orders', 'answer', {
        type: Sequelize.TEXT,
      }),
      await queryInterface.changeColumn('help_orders', 'question', {
        type: Sequelize.TEXT,
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.changeColumn('help_orders', 'answer', {
        type: Sequelize.STRING,
      }),
      await queryInterface.changeColumn('help_orders', 'question', {
        type: Sequelize.STRING,
      }),
    ];
  },
};
