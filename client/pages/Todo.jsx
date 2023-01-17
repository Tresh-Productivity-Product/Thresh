import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

// const Todo = ({ deleteTodo, columns, setColumns, title, text, item, index, getTodos }) => {
const Todo = ({ title, text, item, index, getTodos }) => {
  const deleteTodo = async (id) => {
    console.log('deleted ', item.id);
    await axios.delete(`/api/tasks/delete?id=${id}`);
    getTodos();
  };

  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-primary-500 rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 flex flex-col"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(item.id);
              }}
              className="bg-tertiary-500 px-2 rounded-lg text-primary-500 self-end -mr-4 -mt-1 cursor-pointer"
            >
              x
            </div>

            <div className="text-lg break-words text-center -mt-2">{title}</div>
            <ul className="text-secondary-200 break-words text-left list-disc -mr-3">
              <li>{text}</li>
            </ul>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Todo;
