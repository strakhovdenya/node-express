'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn(
          'users',
          'pass_hash',
          {
            type: Sequelize.STRING,
            allowNull: false
          }
      ),
      await queryInterface.addColumn(
          'users',
          'salt',
          {
            type: Sequelize.STRING,
            allowNull: false
          }
      )
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('users', 'salt'),
      await queryInterface.removeColumn('users', 'pass_hash')
    ];
  }
};
