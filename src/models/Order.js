const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define("order", {
    state: {
      type: DataTypes.ENUM(["pending","accepted","rejected"]),
      allowNull:false,
    },
    total:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
  });
};