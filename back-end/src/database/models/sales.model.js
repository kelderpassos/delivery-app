const SalesModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      sellerId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "sales",
      underscored: true,
    }
  );
  Sale.associate = (model) => {
    Sale.belongsTo(model.User, {
      foreignKey: "userId",
      as: "users",
      onDelete: "CASCADE",
    });
    
    Sale.belongsTo(model.User, {
      foreignKey: "sellerId",
      as: "seller",
      onDelete: "CASCADE",
    });
  };

  return Sale;
};

module.exports = SalesModel;
