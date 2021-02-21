import { useState } from "react"
import { connect } from "react-redux"
import useRouter from "use-react-router"
import { addTodo } from "../../states/todo/action"
import { Layout } from '../../components/Layout'
import { Button, Form } from "react-bootstrap"

const Component = (props) => {
  const { addTodo } = props
  const { history } = useRouter()

  const [addTodoData, setAddTodoData] = useState({
    name: '',
    description: ''
  })

  const onChangeField = (e) => {
    setAddTodoData({
      ...addTodoData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addTodo(addTodoData)
    history.push('/')
  }

  return (
    <Layout>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            onChange={onChangeField} 
            value={addTodoData.name} 
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            name="description"
            onChange={onChangeField} 
            value={addTodoData.description} 
          />
        </Form.Group>

        <Button 
          className="mt-5" 
          type="submit" 
          block
        >
          Tambah
        </Button>
      </Form>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo))
})

const AddTodoPage = 
  connect(null, mapDispatchToProps)(Component)

export { AddTodoPage }                              