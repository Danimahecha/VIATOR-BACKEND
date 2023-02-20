const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Airline', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            info_contact:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
           points:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
           }
    })
}