const Sequelize = require('sequelize');
const sequelize = new Sequelize('lumennui', 'lumennui', 'lumennui', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: console.log,
});

const User = sequelize.define('User', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, defaultValue: null},
        pseudo: {type: Sequelize.STRING(255), allowNull: false, unique: true},
    },
    {tableName: 'user', timestamps: false, underscored: true}
);
exports.User = User;

const Message = sequelize.define('Message', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        emetteur: {type: Sequelize.STRING(255), allowNull: false, },
        date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW}
    },
    {tableName: 'messages', timestamps: false, underscored: true}
);

module.exports = {
    sequelize,
    User,
    Message
}