module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_User: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        passwords: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.Book, { foreignKey: 'user_Id' });
        User.hasMany(models.Club, { foreignKey: 'idOwner' });
        User.hasMany(models.Member, { foreignKey: 'idUser' });
    };

    return User;
};
