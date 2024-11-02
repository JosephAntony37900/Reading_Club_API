module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        review: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        genero:{
          type: DataTypes.STRING(50),
          allowNull: false
        },
        user_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        tableName: 'books',
        timestamps: false
    });

    Book.associate = (models) => {
        Book.belongsTo(models.User, { foreignKey: 'user_Id' });
        Book.hasMany(models.Club, { foreignKey: 'idBook' });
    };

    return Book;
};
