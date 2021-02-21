import {
  getTodo
} from '../../states/todo/action'
import { connect } from 'react-redux'
import useRouter from 'use-react-router'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { Layout } from '../../components/Layout'
import { 
  PencilSquare, 
  ArrowsFullscreen, 
  Trash 
} from 'react-bootstrap-icons';


const Component = (props) => {
  const { todos, getTodo } = props
  const { history } = useRouter()
  
  return todos && todos.length > 0 ? (
    <Layout>
      <ListGroup className="mb-5">
      {
        todos.map(todo => (
          <ListGroup.Item key={todo.id}>
            <Row>
              <Col sm={10}>
                <p className="h5">{todo.name}</p>
              </Col>
              <Col sm={2}>
                <Button 
                  variant="link" 
                  onClick={() => history.push(`/update/${todo.id}`)}
                  className="p-2"
                >
                  <PencilSquare 
                    size={23} 
                    color="royalblue"
                  />
                </Button>
                <Button
                  variant="link"
                  onClick={() => history.push(`/todo/${todo.id}`)}
                  className="p-2"
                >
                  <ArrowsFullscreen 
                    size={20} 
                    color="royalblue" 
                  />
                </Button>
                <Button
                  variant="link"
                  onClick={() => history.push(`/delete/${todo.id}`)}
                  className="p-2"
                >
                  <Trash 
                    size={20} 
                    color="royalblue" 
                  />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      }
      </ListGroup>
      <Button 
        onClick={() => history.push(`/add`)} 
        block
      >
        Tambah
      </Button>
    </Layout>
  ) : (
    <Layout>
      <p className="h5 mb-5">List todo masih kosong</p>
      <Button onClick={getTodo} block>Get Todo</Button>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  todo: state.todos.todo
})

const mapDispatchToProps = (dispatch) => ({
  getTodo: () => dispatch(getTodo())
})

const ListTodoPage = 
  connect(mapStateToProps, mapDispatchToProps)(Component)

export { ListTodoPage }                           