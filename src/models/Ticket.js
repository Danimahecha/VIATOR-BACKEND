const{DataTypes} = require('sequelize')
module.exports = (sequelize)=>{
    sequelize.define('Ticket', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
            },
            seat: {
                type: DataTypes.STRING,
                allowNull: false
            }
    })
}