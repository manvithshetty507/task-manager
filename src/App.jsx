import { useReducer, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState('');
  const [edit, setEdit] = useState('');

  const initialState = [
    { id: 0, text: "Philosopher’s Path", done: true },
    { id: 1, text: "Visit the temple", done: false },
    { id: 2, text: "Drink matcha", done: false }
  ];
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            done: false,
          }
        ];
      case "delete":
        return state.filter((task) => task.id !== action.id);
      case "edit":
        return state.map((task) =>
          task.id === action.id ? { ...task, edit: true } : task
        );
      case "save":
        return state.map((task) =>
          task.id === action.id ? { ...task, edit: false, text: action.text } : task
        );
      default:
        return state;
    }
  }

  const handleAddTask = () => {
    dispatch({
      type: "add",
      id: state.length + 1,
      text: data,
    });
    setData('');
  };

  const handleDelete = (id) => {
    dispatch({
      type: "delete",
      id: id,
    });
  };

  const handleEdit = (id) => {
    dispatch({
      type: "edit",
      id: id
    });
  };

  const handleSave = (id, text) => {
    dispatch({
      type: "save",
      id: id,
      text: text
    });
    setEdit('');
  };

  return (
    <div className="container">
      <div className="tasks-container">
        <div className="input-container">
          <input
            placeholder="Add Task"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="tasks">
          {state.map((task) => (
            <div key={task.id} className="task">
              <span>{task.text}</span>
              {task.edit ? (
                <div className="actions-container">
                  <input
                    className="edit-input"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faSave} onClick={() => handleSave(task.id, edit)} />
                </div>
              ) : (
                <div className="actions-container">
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(task.id)} />
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(task.id)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;