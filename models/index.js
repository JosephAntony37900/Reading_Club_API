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
db.Coment = require('./coment')(sequelize, Sequelize);

// Asociaciones
if (db.Book.associate) {
    db.Book.associate(db);
}
if (db.Club.associate) {
    db.Club.associate(db);
}
if (db.User.associate) {
    db.User.associate(db);
}
if (db.Member.associate) {
    db.Member.associate(db);
}

if (db.Coment.associate) {
    db.Coment.associate(db);
}

// Sincronizar tablas en el orden correcto
async function syncTables() {
    await db.User.sync();
    await db.Book.sync();
    await db.Club.sync(); // Crear la tabla clubs antes de members
    await db.Member.sync();
    await db.Coment.sync();
}

syncTables().then(() => {
    console.log('Tablas sincronizadas correctamente.');
}).catch((error) => {
    console.error('Error al sincronizar tablas:', error);
});

module.exports = db;
