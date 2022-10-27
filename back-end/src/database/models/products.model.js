const ProductsModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "products",
      underscored: true,
    }
  );

  return Product;
};

module.exports = ProductsModel;
