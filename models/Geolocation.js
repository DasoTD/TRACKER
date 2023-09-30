"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../DB");
const Geolocation = sequelize.define('Geolocation', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "id",
        },
      },
      socketID: {
        type: Sequelize.STRING,
        unique: true,
      },
      location: {
        type: Sequelize.GEOMETRY,
      },
      online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      trackerID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
});

module.exports = Geolocation;

// "use strict";

// const { Model, Sequelize } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Geolocation extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.belongsTo(models.User, { foreignKey: "id" });
//     }
//   }
//   Geolocation.init(
//     {
      
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         references: {
//           model: "Users",
//           key: "id",
//           as: "id",
//         },
//       },
//       socketID: {
//         type: Sequelize.STRING,
//         unique: true,
//       },
//       location: {
//         type: Sequelize.GEOMETRY,
//       },
//       online: {
//         type: Sequelize.BOOLEAN,
//       },
//       trackerID: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: "Users",
//           key: "id",
//           as: "id",
//         },
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Geolocation",
//     }
//   );
//   return Geolocation;
// };


