'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cards', 'playerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Players', // Имя таблицы, к которой будет ссылаться внешний ключ
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Или 'CASCADE', в зависимости от вашей логики
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cards', 'playerId');
  }
};