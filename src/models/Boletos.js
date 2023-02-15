const{DataTypes} = require('sequelize')
module.exports = (sequelize)=>{
    sequelize.define('Boletos', {
id:{
type: DataTypes.INTEGER,
unique: true,
autoIncrement: true,
primaryKey: true,
defaultValue: 0,
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
gate: {
    type: DataTypes.STRING,
    allowNull: false
},
aeroLine:{
    type: DataTypes.STRING,
    allowNull: false
},
class: {
    type:DataTypes.STRING,
    allowNull: false,
    defaultValue: 'E'
}
    })
}