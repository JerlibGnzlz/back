require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  UserAddress,
  Category,
  Product,
  Brand,
  UserPayment,
  PaymentType,
  OrderItem,
  Coments,
  CarItem,
  Order,
  Country,
  Favorites,
} = sequelize.models;

Category.hasMany(Product, { foreignKey: { allowNull: false } });
Product.belongsTo(Category);

Brand.hasMany(Product, { foreignKey: { allowNull: false } });
Product.belongsTo(Brand);

User.hasMany(UserAddress);
UserAddress.belongsTo(User);

User.hasMany(UserPayment, { foreignKey: { allowNull: false } });
UserPayment.belongsTo(User);

PaymentType.hasMany(UserPayment);
UserPayment.belongsTo(PaymentType);

User.hasMany(Coments, { foreignKey: { allowNull: false } });
Coments.belongsTo(User);

Product.hasMany(Coments, { foreignKey: { allowNull: false } });
Coments.belongsTo(Product);
// User.belongsToMany(Product, { through: "coments" });
// Product.belongsToMany(User, { through: "coments" });

User.belongsToMany(Product, { through: "carItem" });
Product.belongsToMany(User, { through: "carItem" });

User.hasMany(Order, { foreignKey: { allowNull: false } });
Order.belongsTo(User);

UserPayment.hasMany(Order);
Order.belongsTo(UserPayment);

UserAddress.hasMany(Order);
Order.belongsTo(UserAddress);

Country.hasMany(UserAddress);
UserAddress.belongsTo(Country);

// Product.belongsToMany(Order, { through: "orderItem" });
// Order.belongsToMany(Product, { through: "orderItem" });

Product.hasMany(OrderItem, { foreignKey: { allowNull: false } });
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem, { foreignKey: { allowNull: false } });
OrderItem.belongsTo(Order);

User.belongsToMany(Product, { through: "favorites" });
Product.belongsToMany(User, { through: "favorites" });
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  User,
  UserAddress,
  Category,
  Product,
  Brand,
  UserPayment,
  PaymentType,
  OrderItem,
  Coments,
  CarItem,
  Order,
  Country,
  Favorites,
  // ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
