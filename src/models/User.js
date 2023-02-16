const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('User', {
      id: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        primaryKey: true,
      },
      givenName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      familyName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      nickName: {
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
    
    },
    {
      timestamps: false
    }
    );
  };
  