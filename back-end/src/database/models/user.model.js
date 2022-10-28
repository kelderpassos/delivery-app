const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true
    }
);
  User.associate = (model) => {
    User.hasMany(model.Sale, { foreignKey: 'id', as: 'user'})
  }

  return User;
};

module.exports = UserModel;
