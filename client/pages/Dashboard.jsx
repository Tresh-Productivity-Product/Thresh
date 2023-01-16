import React, { useState, useEffect } from 'react';
import Todo from './Todo.jsx';
import Modal from './Modal.jsx';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';

// const getTodos = async () => {
//   try {
//     const response = await axios.get('');
//     setTodos(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// MOCK DATA
const data = [
  {
    id: 'afd',
    title: 'React',
    text: 'dsafsdfsfd',
  },
  {
    id: 'Dodsfasdf',
    title: 'Tailwind',
    text: 'dsafsdfsfd',
  },
  {
    id: 'Fdsafadsf',
    title: 'Express',
    text: 'dsafsdfsfd',
  },
  {
    id: 'sdfdafs',
    title: 'Database',
    text: 'dsafsdfsfd',
  },
  {
    id: 'dsfasdsadfsfadfsadf',
    title: 'Database',
    text: 'dsafsdfsfd',
  },
  {
    id: 'dsafsdfs',
    title: 'Database',
    text: 'dsafsdfsfd',
  },
  {
    id: 'dsfasdfasdfsdfdfsadf',
    title: 'Database',
    text: 'dsafsdfsfd',
  },
  {
    id: 'sadfsd',
    title: 'Database',
    text: 'dsafsdfsfd',
  },
];

const status = {
  ['tasks']: {
    name: 'To Do',
    items: data,
  },
  ['inProgress']: {
    name: 'In Progress',
    items: [],
  },
  ['verified']: {
    name: 'Verified',
    items: [],
  },
  ['complete']: {
    name: 'Complete',
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Dashboard = () => {
  const [todos, setTodos] = useState(data);
  const [newTodo, setNewTodo] = useState({
    title: '',
    text: '',
  });
  const [modalActive, setModalActive] = useState(false);
  const [columns, setColumns] = useState(status);

  // useEffect(() => {
  //   getTodos();
  // }, []);

  // const getTodos = async () => {
  //   try {
  //     const response = await axios.get('');
  //     setTodos(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('', {
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

  const handleOnDragEnd = (result) => {
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* <ChevronDoubleRightIcon
        onClick={handleSidebar}
        className="h-6 w-6 flex-auto self-start mt-20 bg-tertiary-500 rounded-sm p-1 text-primary-500"
      /> */}
      <div className="grid grid-cols-4 w-5/6 h-3/4 gap-10 mt-10">
        {/* <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-secondary-500 rounded-xl px-5 py-3 h-full text-primary-500 overflow-y-auto"
              >
                <div className="text-lg">
                  Tasks{' '}
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
                {todos.map((todo, index) => (
                  <Todo
                    title={todo.title}
                    text={todo.text}
                    id={todo.id}
                    key={todo.id}
                    index={index}
                  />
                ))}
                MOCK TODOS
                <Todo />
                <Todo />
                <Todo />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Column
                colName={column.name}
                droppableId={columnId}
                key={columnId}
                index={index}
                column={column}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
