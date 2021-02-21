const { Todo, User } = require('../database/models')

exports.findAll = async (req, res, next) => {                      
  try {
    const todo = await Todo.findAll()

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get todos.',
      data: todo
    })
  } catch (error) {
    return next(error)
  }
}

exports.findById = async (req, res, next) => {                         
  try {
    const { id } = req.params

    const todo = await Todo.findByPk(id)

    if (!todo) {
      throw new Error('Todo with this id not found.')
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success get todos.',
      data: todo
    })
  } catch (error) {
    return next(error)
  }
}

exports.add = async (req, res, next) => {                             
  try {
    const { user } = req
    const { name, description } = req.body

    const todo = await Todo.create({
      name, 
      description, 
      user_id: user.id
    })

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create todo.',
      data: todo
    })
  } catch (error) {
    return next(error)
  }
}

exports.update = async (req, res, next) => {                          
  try {
    const { user } = req
    const { id, name, description } = req.body

    const todo = await Todo.findByPk(id)

    if (!todo) {
      throw new Error('Todo with this id not found.')
    }

    await Todo.update({
      name, 
      description,
      user_id: user.id
    }, {
      where: {
        id
      }
    })

    const updatedTodo = await Todo.findByPk(id)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success update todo.',
      data: updatedTodo
    })
  } catch (error) {
    return next(error)
  }
}

exports.destroy = async (req, res, next) => {                     
  try {
    const { id } = req.params

    await Todo.destroy({
      where: {
        id
      }
    })

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success delete todo.'
    })
  } catch (error) {
    return next(error)
  }
}