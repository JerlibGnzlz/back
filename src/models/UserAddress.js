const {DataTypes}=require ("sequelize");

module.exports=(sequelize)=>{
    sequelize.define("userAddress",{
        postalCode:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        state:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        city:{
            type:DataTypes.STRING(40),
            allowNull:false
        },
        address:{
            type:DataTypes.STRING(40),
            allowNull:false
        },
        annotations:{
            type:DataTypes.TEXT           
        },
        deleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }

        
    })
}