const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0.1,
        },
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      genre: {
        type: DataTypes.ENUM("men", "women", "kids", "accesories"),
        allowNull: false,
      },
      stock:{
        type: DataTypes.INTEGER,
        defaultValue: 10
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
