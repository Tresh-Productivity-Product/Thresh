import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Todo from './Todo.jsx';
import Modal from './Modal.jsx';
import axios from 'axios';
// import { io } from 'socket.io-client';

const Column = ({ deleteTodo, columns, setColumns, colName, droppableId, column, getTodos }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    text: '',
  });
  const [modalActive, setModalActive] = useState(false);

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const axiosPost = async () => {
    const response = await axios.post('/api/tasks/create', {
      title: newTodo.title,
      text: newTodo.text,
    });
    setColumns((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        items: [...prev.tasks.items, response.data],
      },
    }));
  };

  // const socket = io('http://localhost:3000');

  // useEffect(() => {
  //   socket.on('newTodo', (task) => {
  //     setColumns((prev) => ({
  //       ...prev,
  //       tasks: {
  //         ...prev.tasks,
  //         items: [...prev.tasks.items, task],
  //       },
  //     }));
  //   });
  // }, [columns.tasks.items]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('/api/tasks/create', {
        title: newTodo.title,
        text: newTodo.text,
      });
      console.log(response.data);
      // setColumns((prev) => ({
      //   ...prev,
      //   tasks: {
      //     ...prev.tasks,
      //     items: [...prev.tasks.items, response.data],
      //   },
      // }));
      // axiosPost();
      // socket.emit('createTask', response.data)
      setNewTodo((todo) => ({ ...todo, title: '', text: '' }));
      handleCloseModal();        //CLOSE NEW TODO MODAL
      getTodos();                //REFRESH                      
      // const populate = await axios.get('/api/tasks')
      // setColumns((prev) => ({
      //   ...prev,
      //   tasks: {
      //     ...prev.tasks,
      //     items: [...prev.tasks.items, populate.data],
      //   },
      // }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoTitle = (e) => {
    setNewTodo((todo) => ({ ...todo, title: e.target.value }));
    // console.log(newTodo.title);
  };

  const handleTodoText = (e) => {
    setNewTodo((todo) => ({ ...todo, text: e.target.value }));
    // console.log(newTodo.text);
  };

  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-secondary-500 rounded-xl px-5 py-3 text-primary-500 h-full overflow-y-auto"
          >
            {/* <p className="text-lg">{colName}</p> */}
            <div className="text-lg">
              {colName}{' '}
              {colName === 'To Do' && (
                <span
                  onClick={handleOpenModal}
                  className="bg-tertiary-500 text-primary-500 rounded-lg px-2 text-xl ml-3 hover:bg-opacity-75 cursor-pointer"
                >
                  +
                </span>
              )}
              {modalActive && (
                <Modal
                  newTodo={newTodo}
                  handleCloseModal={handleCloseModal}
                  handleTodoTitle={handleTodoTitle}
                  handleTodoText={handleTodoText}
                  handleSubmit={handleSubmit}
                  getTodos={getTodos}
                />
              )}
            </div>
            {column?.items?.map((item, index) => {
              return (
                <Todo
                  key={item.ID}
                  item={item}
                  index={index}
                  title={item.title}
                  text={item.text}
                  getTodos={getTodos}
                  columns={columns}
                  setColumns={setColumns}
                  deleteTodo={deleteTodo}
                />
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
