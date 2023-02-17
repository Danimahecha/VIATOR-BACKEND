const{DataTypes} = require('sequelize')
module.exports = (sequelize)=>{
    sequelize.define('Boletos', {
        id:{
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: 0
            },
            seat: {
                type: DataTypes.STRING,
                allowNull: false
            }
    })
}