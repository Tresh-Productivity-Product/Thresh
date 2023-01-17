import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

// const Todo = ({ deleteTodo, columns, setColumns, title, text, item, index, getTodos }) => {
const Todo = ({ columns, setColumns, title, text, item, index, getTodos }) => {

  const deleteTodo = async (id) => {
    
    console.log('deleted ', item.id)
    // const populate = 
    // axios.delete(`/api/tasks/delete?id=${item.id}`)
    // fetch(`/api/tasks/delete?id=${item.id}`, {
    //   method: 'DELETE',
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   // },
    //   // body: JSON.stringify(item.id)
    // })
    // .then(data => console.log('DATA: ', data))
    // setTimeout(getTodos(), 500)
    const response = await axios.delete(`/api/tasks/delete?id=${id}`)
    getTodos();
    // console.log(columns)
    // setColumns((prev) => prev.tasks.items.filter(task => task._id !== response.data.id))
    // getTodos()
  }

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
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteTodo(item.id)
              }}
            >Delete</button>
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
