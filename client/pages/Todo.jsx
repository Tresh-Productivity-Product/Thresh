import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Todo = ({ title, text, item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-primary-500 rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 text-center"
          >
            <div className="text-lg break-words">{title}</div>
            <ul className="text-secondary-200 break-words text-left list-disc -mr-3">
              <li>{text}</li>
            </ul>
          </div>
        );
      }}
    </Draggable>
    // <div className="bg-primary-500 rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 text-center">
    //   <div className="text-xl break-words">{title}</div>
    //   <ul className="text-secondary-200 break-words text-left list-disc -mr-3">
    //     <li>
    //       {text}
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Todo;
