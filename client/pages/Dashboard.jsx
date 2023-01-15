import React, { useState, useEffect } from 'react';
import Todo from './Todo.jsx';
import Modal from './Modal.jsx';
import axios from 'axios';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    text: '',
  });
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:3000/api/tasks/', {
        title: newTodo.title,
        text: newTodo.text,
      });
      setTodos((todos) => [...todos, response.data]);
      setNewTodo((todo) => ({ ...todo, title: '', text: '' }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoTitle = (e) => {
    setNewTodo((todo) => ({ ...todo, title: e.target.value }));
    console.log(newTodo.title);
  };

  const handleTodoText = (e) => {
    setNewTodo((todo) => ({ ...todo, text: e.target.value }));
    console.log(newTodo.text);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* <ChevronDoubleRightIcon
        onClick={handleSidebar}
        className="h-6 w-6 flex-auto self-start mt-20 bg-tertiary-500 rounded-sm p-1 text-primary-500"
      /> */}
      <div className="grid grid-cols-4 w-5/6 h-3/4 gap-10 mt-10">
        <div className="bg-secondary-500 rounded-xl px-5 py-3 text-primary-500">
          <div className="text-lg">
            Task{' '}
            <span
              onClick={handleOpenModal}
              className="bg-tertiary-500 text-primary-500 rounded-lg px-2 text-xl ml-3 hover:bg-opacity-75 cursor-pointer"
            >
              +
            </span>
            {modalActive && (
              <Modal
                newTodo={newTodo}
                handleCloseModal={handleCloseModal}
                handleTodoTitle={handleTodoTitle}
                handleTodoText={handleTodoText}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
          {todos.map((todo) => (
            <Todo todo={todo} key={todo._id} />
          ))}
          {/* MOCK TODOS */}
          <Todo />
          <Todo />
          <Todo />
        </div>
        <div className="bg-secondary-500 rounded-xl px-5 py-3 text-primary-500">
          <p className="text-lg">In Progress</p>
        </div>
        <div className="bg-secondary-500 rounded-xl px-5 py-3 text-primary-500">
          <p className="text-lg">Verified</p>
        </div>
        <div className="bg-secondary-500 rounded-xl px-5 py-3 text-primary-500">
          <p className="text-lg">Complete</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
