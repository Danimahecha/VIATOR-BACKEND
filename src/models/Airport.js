const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Airport', {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        },
        {
            timestamps: false
        }
      );
}