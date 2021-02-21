import { useEffect, useState } from "react"
import { connect } from "react-redux"
import useRouter from "use-react-router"
import { getTodoById, updateTodo } from "../../states/todo/action"
import { Layout } from '../../components/Layout'
import { Button, Form } from "react-bootstrap"

const Component = (props) => {
  const { todo, getTodoById, updateTodo } = props
  const { match, history } = useRouter()
  const [updateTodoData, setUpdateTodoData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    getTodoById(match.params.id)
  }, [getTodoById, match.params.id])

  useEffect(() => {
    setUpdateTodoData(todo)
  }, [todo])

  const onUpdate = () => {
    updateTodo(updateTodoData)
    history.push('/')
  }

  const onBack = () => {
    history.push('/')
  }

  const onChangeField = (e) => {
    setUpdateTodoData({
      ...updateTodoData,
      [e.target.name]: e.target.value
    })
  }

  return todo ? (
    <Layout>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            onChange={onChangeField} 
            value={updateTodoData.name} 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            name="description"
            onChange={onChangeField} 
            value={updateTodoData.description} 
          />
        </Form.Group>
        <Button 
          className="mt-5" 
          onClick={onUpdate} 
          block
        >
          Update
        </Button>
      </Form>
    </Layout>
  ) : (
    <Layout>
      <p>Todo tidak dapat ditemukan</p>
      <Button 
        className="mt-5" 
        onClick={onBack} 
        block
      >
        Back
      </Button>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  todo: state.todos.todo
})

const mapDispatchToProps = (dispatch) => ({
  getTodoById: (id) => dispatch(getTodoById(id)),
  updateTodo: (todo) => dispatch(updateTodo(todo))
})

const UpdateTodoPage = 
  connect(mapStateToProps, mapDispatchToProps)(Component)

export { UpdateTodoPage }                            