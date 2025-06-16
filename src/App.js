import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoList     from './ToDoList';
import ToDoTaskAdd  from './ToDoTaskAdd';
import ToDoTaskEdit from './ToDoTaskEdit';
import { todoAddAll } from './actions';

class App extends React.Component {
  componentDidMount() {
    fetch('tasks')
      .then(res => res.json())
      .then(data => this.props.dispatch(todoAddAll(data)));
  }

  render() {
    return (
      <Router>
        <div className="container row justify-content-center">
          <div className="col-md-8">
            <Routes>
              <Route path="/"       element={<ToDoList />} />
              <Route path="/add"    element={<ToDoTaskAdd />} />
              <Route path="/edit/:id" element={<ToDoTaskEdit />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
