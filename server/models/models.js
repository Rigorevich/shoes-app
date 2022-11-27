const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CartShoes = sequelize.define("cart_shoes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Shoes = sequelize.define("shoes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  sizes: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ShoesInfo = sequelize.define("shoes_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartShoes);
CartShoes.belongsTo(Cart);

Type.hasMany(Shoes);
Shoes.belongsTo(Type);

Brand.hasMany(Shoes);
Shoes.belongsTo(Brand);

Shoes.hasMany(CartShoes);
CartShoes.belongsTo(Shoes);

Shoes.hasMany(ShoesInfo, { as: "info" });
ShoesInfo.belongsTo(Shoes);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Cart,
  CartShoes,
  Shoes,
  Type,
  Brand,
  ShoesInfo,
  TypeBrand,
};
