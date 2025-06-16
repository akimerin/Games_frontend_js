import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { todoEdit } from './actions';
import { useNavigate, useParams, NavLink } from 'react-router-dom';

function ToDoTaskEdit({ tasks, dispatch }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    _id: '',
    name: '',
    price: '',
    studio: '',
    genre: '',
    done: false
  });

  useEffect(() => {
    const t = tasks.find(x => x._id === id);
    if (t) setForm(t);
  }, [id, tasks]);

  const onChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8001/tasks/${form._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка на сервере');
        return res.json();
      })
      .then((updated) => {
        // Диспатчим экшен обновления в Redux
        dispatch(todoEdit(
          updated._id,
          updated.name,
          updated.price,
          updated.studio,
          updated.genre,
          updated.done
        ));
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert('Не удалось сохранить изменения');
      });
  };

  return (
    <div className="card">
      <div className="card-header">
        <i className="fa fa-pencil me-2" /> Editing: <strong>{form.name}</strong>
      </div>
      <form onSubmit={onSubmit} className="p-3">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className="form-control mb-2"
          placeholder="Название"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          className="form-control mb-2"
          placeholder="Цена"
          required
        />
        <input
          name="studio"
          value={form.studio}
          onChange={onChange}
          className="form-control mb-2"
          placeholder="Студия"
          required
        />
        <input
          name="genre"
          value={form.genre}
          onChange={onChange}
          className="form-control mb-2"
          placeholder="Жанр"
          required
        />
        <button className="btn btn-primary">Save</button>
      </form>
      <div className="card-footer text-right">
        <NavLink to="/" className="btn btn-secondary">
          Back
        </NavLink>
      </div>
    </div>
  );
}

// Подключаем к Redux: получаем tasks и dispatch
export default connect(state => ({ tasks: state.tasks }))(ToDoTaskEdit);
