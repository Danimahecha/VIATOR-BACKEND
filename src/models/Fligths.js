const { DataTypes } = require("sequelize")

module.exports= (sequelize)=>{
sequelize.define('Fligths',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    origin:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    destiny:{
    type:DataTypes.STRING,
    allowNull:false,
    },
    dateTimeDeparture:{
        type:DataTypes.DATE,
        allowNull: false,
        },
    
    dateTimeArrival:{
        type:DataTypes.DATE,
        allowNull: false,
    },

    seatsAvailable:{
        type:DataTypes.INTEGER,
        
    },
    ticketPrice:{
        type:DataTypes.STRING,
        }
    },
    {
    timestamps: false,
})
};
