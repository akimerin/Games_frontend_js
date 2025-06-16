import React from 'react';
import { connect } from 'react-redux';
import { todoDelete } from './actions';
import { NavLink } from 'react-router-dom';

class ToDoTask extends React.Component {
  onDelete = () => {
    fetch(`tasks/${this.props.task._id}`, { method: 'DELETE' })
      .then(() => this.props.dispatch(todoDelete(this.props.task._id)));
  };

  render() {
    const { name, price, studio, genre, description } = this.props.task;

    return (
      <div className="game-item">
        <div className="game-item-header">
          <h2 className="game-title">{name}</h2>
          <span className="game-price">{price}₽</span>
        </div>
        <div className="game-meta">
          <span className="game-studio">Студия: {studio}</span>
          <span className="game-genre">Жанр: {genre}</span>
        </div>
        {description && (
          <p className="game-description">{description}</p>
        )}
        <div className="game-actions">
          <NavLink to={`/edit/${this.props.task._id}`} className="btn-edit">
            Изменить
          </NavLink>
          <button onClick={this.onDelete} className="btn-delete">
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(ToDoTask);
