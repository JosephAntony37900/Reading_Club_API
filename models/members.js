module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        tableName: 'members',
        timestamps: false
    });

    Member.associate = (models) => {
        Member.belongsTo(models.User, { foreignKey: 'idUser' });
    };

    return Member;
};
