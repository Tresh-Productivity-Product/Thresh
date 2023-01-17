import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';

// MOCK DATA
// const data = [
//   {
//     id: 'afd',
//     title: 'React',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'Dodsfasdf',
//     title: 'Tailwind',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'Fdsafadsf',
//     title: 'Express',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'sdfdafs',
//     title: 'Database',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'dsfasdsadfsfadfsadf',
//     title: 'Node',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'dsafsdfs',
//     title: 'Authorization',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'dsfasdfasdfsdfdfsadf',
//     title: 'Authentication',
//     text: 'dsafsdfsfd',
//   },
//   {
//     id: 'sadfsd',
//     title: 'Feed the Dog',
//     text: 'dsafsdfsfd',
//   },
// ];

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
      items: [],
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

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('/api/tasks');
      // console.log('RES DATAAA: ', response.data)
      setColumns({
        ['tasks']: {
          name: 'To Do',
          items: response.data,
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
      })
    } catch (err) {
      console.log(err);
    }
  };

  // const deleteTodo = async (id) => {
    
  //   console.log('deleted ', id);
  //   const response = await axios.delete(`/api/tasks/delete?id=${id}`)
  //   console.log(columns.tasks.items)
  //   setColumns((prev) => prev.tasks.items.filter(task => task._id !== response.data.id))
  //   // getTodos()
  // }

  // console.log('HERE', columns.tasks.items)
  // console.log(getTodos)
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
                setColumns={setColumns}
                colName={column.name}
                droppableId={columnId}
                key={columnId}
                index={index}
                column={column}
                getTodos={getTodos}
                // deleteTodo={deleteTodo}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
