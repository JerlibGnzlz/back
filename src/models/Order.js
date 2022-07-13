const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define("order", {
    id:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.ENUM(["pending","approved", "send", "delivered", "rejected"]),
      allowNull:false,
    },
    total:{
        type:DataTypes.DECIMAL,
        allowNull:true,
    },
    date:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    payment_type:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    postalCode:{
      type:DataTypes.STRING(20),
      allowNull:false,
    },
    estado:{
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
    partment:{
      type:DataTypes.STRING(40)
    },
  });
};