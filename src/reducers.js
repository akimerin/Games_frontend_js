
import { combineReducers } from 'redux';
import {
  TODO_ADD,
  TODO_ADD_ALL,
  TODO_DELETE,
  TODO_UPDATE_STATE,
  TODO_EDIT
} from './actions';

function todo(state = [], action) {
  switch (action.type) {
    case TODO_ADD:
      return [
        ...state,
        {
          _id: action._id,
          name: action.name,
          price: action.price,
          studio: action.studio,
          genre: action.genre,
          done: action.done
        }
      ];
    case TODO_ADD_ALL:
      return [...(action.todo_list || [])];
    case TODO_DELETE:
      return state.filter(t => t._id !== action._id);
    case TODO_UPDATE_STATE:
      return state.map(t =>
        t._id === action._id ? { ...t, done: !t.done } : t
      );
    case TODO_EDIT:
      return state.map(t =>
        t._id === action._id
          ? {
              ...t,
              name: action.name,
              price: action.price,
              studio: action.studio,
              genre: action.genre,
              done: action.done
            }
          : t
      );
    default:
      return state;
  }
}

export default combineReducers({ tasks: todo });
