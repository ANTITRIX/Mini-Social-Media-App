const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const Token = sequelize.define('Token', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Reference the 'users' table (adjust as needed)
            key: 'id',
        },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    expires: {
        type: DataTypes.INTEGER,
        defaultValue: 3600, // Assuming expiration in seconds
    },
}, {
    // Additional options (if any)
});
module.exports=Token;