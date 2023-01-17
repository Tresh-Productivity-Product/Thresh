import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';

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
  const [tasks, setTasks] = useState([]);
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

  const getTodos = async (cb) => {
    try {
      const response = await axios.get('/api/tasks');
      console.log(response.data);
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
      // setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`/api/tasks/delete?id=${id}`)
    getTodos();
    // setColumns(prev => prev.tasks.items.filter(task => task.id !== response.data.id))
  }

  // console.log('HERE', tasks);

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
                // droppableId={column.name}
                key={columnId}
                index={index}
                column={column}
                getTodos={getTodos}
                deleteTodo={deleteTodo}
              />
            );
          })}
          {/* <Column droppableId="todo" colName="To Do" tasks={tasks} />
          <Column droppableId="prog" colName="In Progress" tasks={tasks} />
          <Column droppableId="verified" colName="Verified" tasks={tasks} />
          <Column droppableId="complete" colName="Complete" tasks={tasks} /> */}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
