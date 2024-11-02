module.exports = (sequelize, DataTypes) => {
    const Coment = sequelize.define('Coment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comments: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        idMember: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'members',
                key: 'id'
            }
        }
    }, {
        tableName: 'coments',
        timestamps: false
    });

    Coment.associate = (models) => {
        Coment.belongsTo(models.Member, { foreignKey: 'idMember' });
    };

    return Coment;
};
