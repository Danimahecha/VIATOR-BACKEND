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
            from: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            to:{
                type: DataTypes.STRING,
                allowNull: false
            },
            boardingTime:{
                type: DataTypes.DATE,
                allowNull: false,
            },
            seat: {
                type: DataTypes.STRING,
                allowNull: false
            },
            },{
                timestamps: false,
            });
}