const sequelize = require('../connection')              
const User = require('./User')
const Todo = require('./Todo')

User.hasMany(Todo, {
  as: 'todos',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Todo.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

module.exports = {
  sequelize,
  User,
  Todo
}