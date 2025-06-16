import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { todoAdd } from './actions';

class AddInner extends React.Component {
  state = { name: '', price: '', studio: '', genre: '' };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    fetch('tasks', {
      method: 'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ ...this.state, done: false })
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch(todoAdd(
          data._id,
          data.name,
          data.price,
          data.studio,
          data.genre,
          data.done
        ));
        this.props.history('/');
      });
  };

  render() {
    const { name, price, studio, genre } = this.state;
    return (
      <div className="card">
        <div className="card-header"> Add game</div>
        <form onSubmit={this.onSubmit} className="p-3">
          <input name="name"    value={name}   onChange={this.onChange} className="form-control mb-2" placeholder="Название" required />
          <input name="price"   value={price}  onChange={this.onChange} className="form-control mb-2" placeholder="Цена"    required />
          <input name="studio"  value={studio} onChange={this.onChange} className="form-control mb-2" placeholder="Студия"  required />
          <input name="genre"   value={genre}  onChange={this.onChange} className="form-control mb-2" placeholder="Жанр"    required />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
        <div className="card-footer text-right">
          <NavLink to="/" className="btn btn-secondary">Back</NavLink>
        </div>
      </div>
    );
  }
}

const ToDoTaskAdd = props => {
  const navigate = useNavigate();
  return <AddInner {...props} history={navigate} />;
};

export default connect()(ToDoTaskAdd);
