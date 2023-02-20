const { DataTypes } = require("sequelize")

module.exports= (sequelize)=>{
sequelize.define('Fligth',{
    id:{
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
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
        arrivesTime:{
            type: DataTypes.DATE,
            allowNull: false,
        },
       
        
      
        price: {
            type:DataTypes.STRING,
            allowNull: false,
           
        }
})
}