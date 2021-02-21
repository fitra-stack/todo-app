export const getTodo = () => {
  return {
    type: 'GET_TODO',
    payload: [
      {
        id: Math.random(),
        name: 'Belajar',
        description: 'Belajar persiapan small project'
      },
      {
        id: Math.random(),
        name: 'Membaca',
        description: 'Membaca novel sebelum tidur'
      },
      {
        id: Math.random(),
        name: 'Meeting',
        description: 'Meeting dengan client jam 7 malam'
      }
    ]
  }
}

export const getTodoById = (id) => {                 
  return {
    type: 'GET_TODO_BY_ID',
    payload: {
      id
    }
  }
}

export const addTodo = (todo) => {       
  const request = axios.post('http://localhost:8000/todo', todo, {
    headers:{
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
  })
  
  return(dispatch) =>
    request.then(response => 
      dispatch({
        type: 'ADD_TODO',
        payload: response.data.data
      }) 
    ).catch(error => {
      alert('you must re-login')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('token')
    })
}

export const updateTodo = (todo) => {      
  const request = axios.patch('http://localhost:8000/todo', todo, {
    headers:{
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return(dispatch) =>
    request.then(response => 
      dispatch({
        type: 'UPDATE_TODO',
        payload: response.data.data
      }) 
    ).catch(error => {
      alert('you must re-login')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('token')
    })
}

export const deleteTodo = (id) => {    
  const request = axios.patch('http://localhost:8000/todo/${id}', todo, {
    headers:{
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
  })       

  return(dispatch) =>
    request.then(response => 
      dispatch({
        type: 'DELETE_TODO',
        payload: {id}
      }) 
    ).catch(error => {
      alert('you must re-login')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('token')
    })
}