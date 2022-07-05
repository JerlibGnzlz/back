const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('carItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  })
}