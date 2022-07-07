const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define("order", {
    id:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.ENUM(["pending","approved", "send", "delivered"]),
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
    }
  });
};