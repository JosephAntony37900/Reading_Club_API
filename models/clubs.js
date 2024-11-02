module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      idOwner: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          }
      },
      name: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      description: {
          type: DataTypes.STRING(200),
          allowNull: false
      },
      date: {
          type: DataTypes.DATE,
          allowNull: false
      },
      members: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      location: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      idBook: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'books',
              key: 'id'
          }
      }
  }, {
      tableName: 'clubs',
      timestamps: false
  });

  Club.associate = (models) => {
      Club.belongsTo(models.User, { foreignKey: 'idOwner' });
      Club.belongsTo(models.Book, { foreignKey: 'idBook' });
      Club.hasMany(models.Member, { foreignKey: 'idClub' });
  };

  return Club;
};
