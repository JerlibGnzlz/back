const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // uid: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    names: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    lastNames: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    genre: {
      type: DataTypes.ENUM("male", "female"),
    },
    image: {
      type: DataTypes.STRING,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      defaultValue: [],
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
