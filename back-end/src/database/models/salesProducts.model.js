const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    "salesProduct",
    {
      saleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "sales_products",
      underscored: true,
    }
  );

  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: SalesProducts,
      foreignKey: "saleId",
      otherKey: "productId",
    });

    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: SalesProducts,
      foreignKey: "productId",
      otherKey: "saleId",
    });

    SalesProducts.belongsTo(models.Product, {
      as: "products",
      foreignKey: "productId",
      onDelete: "CASCADE",
    });

    models.Product.hasMany(SalesProducts, {
      as: "saleProducts",
    });
  };

  return SalesProducts;
};

module.exports = SalesProductsModel;
