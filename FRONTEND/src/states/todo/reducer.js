const initialState = {
  todos: [],
  todo: {
    id: 0,
    name: '',
    description: ''
  }
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TODO':
      return {
        ...state,
        todos: action.payload                      
      }
    case 'GET_TODO_BY_ID':
      const findTodo = state.todos
        .find(
          todo => String(todo.id) === String(action.payload.id)
        )

      return {
        ...state,
        todo: findTodo
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload                      
        ]
      }
    case 'UPDATE_TODO':
      const todos = state.todos
      const todoIndex = todos
        .findIndex(
          todo => String(todo.id) === String(action.payload.id)
        )

      if (todoIndex >= 0) {
        todos[todoIndex] = action.payload
      }

      return {
        ...state,
        todos: todos                      
      }
    case 'DELETE_TODO':
      const filteredTodos = state.todos
        .filter(
          todo => String(todo.id) !== String(action.payload.id)
        )

      return {
        ...state,
        todos: filteredTodos
      }
    default:
      return state
  }
}

export default todoReducer