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
            allowNull: true,
            references: {
                model: 'members',
                key: 'id'
            }
        },
        idClub: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clubs', // Asegúrate de que el modelo `clubs` existe y está correctamente definido
                key: 'id'
            }
        }
    }, {
        tableName: 'coments',
        timestamps: false
    });

    Coment.associate = (models) => {
        Coment.belongsTo(models.Member, { foreignKey: 'idMember' });
        Coment.belongsTo(models.Club, { foreignKey: 'idClub' }); 
    };

    return Coment;
};
