const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Airline', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
              defaultValue: ""
            },
            infoContact:{
              type: DataTypes.STRING,
              defaultValue: ""
      
          },
          rating:{
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: true
        },
        
          },
          {
            timestamps: false
          }
      );
}