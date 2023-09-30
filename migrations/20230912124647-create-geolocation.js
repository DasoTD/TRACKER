'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Geolocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      socketID: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      online: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
      },
      trackerID: {
        type: Sequelize.INTEGER,
        allowNull: true, // Adjust this to your requirements
      },
      location: {
        type: Sequelize.GEOMETRY //('POINT') // New data type
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Geolocations');
  }
};