const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('model', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      givenName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      sub: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
    },
    {
      timestamps: false
    }
    );
  };
  