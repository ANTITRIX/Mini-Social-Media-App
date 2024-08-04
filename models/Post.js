const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;
const User=require('./Users')

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'posts',
        timestamps: false,
    }
);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
module.exports = Post;
