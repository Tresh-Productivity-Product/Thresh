import React, { useState, useEffect } from 'react';
import Todo from './Todo.jsx';
import Modal from './Modal.jsx';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';

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
  // change data to empty array when working with real data
  const [columns, setColumns] = useState({
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
  });

  // useEffect(() => {
  //   getTodos();
  // }, []);

  // const getTodos = async () => {
  //   try {
  //     const response = await axios.get('');
  //     console.log(response.data)
  //     setColumns((prev) => ({
  //       ...prev,
  //       tasks: {
  //         ...prev.tasks,
  //         items: [...prev.tasks.items, response.data],
  //       },
  //     }));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="grid grid-cols-4 w-5/6 h-3/4 gap-10 mt-10">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Column
                columns={columns}
                setColumns
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
