const { DataTypes } = require("sequelize")

module.exports= (sequelize)=>{
sequelize.define('Fligths',{
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true

    },
    nameFromOrTO:{
        type: DataTypes.STRING,
        allowNull: false
    },
    datesFligths:{
        type: DataTypes.DATE(),
        allowNull:false
    }
})
}