import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ToDoTask from './ToDoTask';

class ToDoList extends React.Component {
  render() {
    return (
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span><i className="fa fa-list"></i> Game Lists</span>
        </div>

        <div className="card-body p-0">
          {this.props.tasks.map(task => (
            <ToDoTask key={task._id} task={task} />
          ))}
        </div>

        <div className="card-footer text-right">
          <NavLink to="/add" className="btn btn-primary">
            Add game
          </NavLink>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ tasks: state.tasks }))(ToDoList);
