import { useEffect } from "react"
import { connect } from "react-redux"
import useRouter from 'use-react-router'
import { getTodoById } from "../../states/todo/action"
import { Layout } from '../../components/Layout'
import { Button, Card } from "react-bootstrap"

const Component = (props) => {
  const { todo, getTodoById } = props
  const { match, history } = useRouter()

  useEffect(() => {
    getTodoById(match.params.id)
  }, [getTodoById, match.params.id])

  const onBack = () => {
    history.push('/')
  }

  return todo ? (
    <Layout>
      <Card className="text-center">
        <Card.Header>{todo.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{todo.description}</p>
            <footer className="blockquote-footer">
              id <cite title="Source Title">{todo.id}</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
      <Button 
        className="mt-5" 
        onClick={onBack} 
        block
      >
        Kembali
      </Button>
    </Layout>
  ) : (
    <Layout>
      <p>Detail todo tidak ditemukan</p>
      <Button 
        className="mt-5" 
        onClick={onBack} 
        block
      >
        Kembali
      </Button>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  todo: state.todos.todo
})

const mapDispatchToProps = (dispatch) => ({
  getTodoById: (id) => dispatch(getTodoById(id))        
})

const DetailTodoPage = 
  connect(mapStateToProps, mapDispatchToProps)(Component)

export { DetailTodoPage }                         