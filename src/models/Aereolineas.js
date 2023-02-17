const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Aerolineas', {
        id:{
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: 0
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            info_contact:{
                type: DataTypes.INTEGER
            }
           
    })
}