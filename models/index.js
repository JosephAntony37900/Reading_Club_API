const Sequelize = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.connection = sequelize;

db.Book = require('./book')(sequelize, Sequelize);
db.Club = require('./clubs')(sequelize, Sequelize);
db.Member = require('./members')(sequelize, Sequelize);
db.User = require('./users')(sequelize, Sequelize);

// Define las asociaciones
db.Book.associate(db);
db.Club.associate(db);
db.Member.associate(db);
db.User.associate(db);

module.exports = db;
