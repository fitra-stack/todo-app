import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';            

import { LoginPage } from './pages/auth/login'
import { RegisterPage } from './pages/auth/register'
import { ListTodoPage } from './pages/todo/list-todo'
import { DetailTodoPage } from './pages/todo/detail-todo'
import { UpdateTodoPage } from './pages/todo/update-todo'
import { AddTodoPage } from './pages/todo/add-todo'
import { DeleteTodoPage } from './pages/todo/delete-todo'
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={ListTodoPage} path="/" exact />
        <Route component={DetailTodoPage} path="/todo/:id" />
        <ProtectedRoute component={AddTodoPage} path="/add" />
        <ProtectedRoute component={UpdateTodoPage} path="/update/:id" />
        <ProtectedRoute component={DeleteTodoPage} path="/delete/:id" />
      </Switch>
    </Router>
  );
}

export default App;