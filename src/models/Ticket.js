const{DataTypes} = require('sequelize')
module.exports = (sequelize)=>{
    sequelize.define('Ticket', {
        id:{
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            },
            namePassanger:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            seat: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            },{
                timestamps: false,
            });
}