const { Model, DataTypes } = require('sequelize')      
const connection = require('../connection')      

class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  modelName: 'Todos',
  sequelize: connection,
  paranoid: false,
  timestamps: false
})

module.exports = Todo