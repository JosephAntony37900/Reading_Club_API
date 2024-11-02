'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Aquí agregas la nueva columna 'idClub' a la tabla 'coments'
    await queryInterface.addColumn('coments', 'idClub', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'clubs', // Asegúrate de que la tabla 'clubs' exista
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // Aquí defines la reversión de la migración, eliminando la columna 'idClub'
    await queryInterface.removeColumn('coments', 'idClub');
  }
};
