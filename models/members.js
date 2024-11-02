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
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        idClub: { // Relación con clubes
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clubs',
                key: 'id'
            }}
    }, {
        tableName: 'members',
        timestamps: false
    });

    Member.associate = (models) => {
        Member.belongsTo(models.User, { foreignKey: 'idUser' });
        Member.belongsTo(models.Club, { foreignKey: 'idClub' });
        Member.hasMany(models.Coment, { foreignKey: 'idMember' });
    };

    return Member;
};
