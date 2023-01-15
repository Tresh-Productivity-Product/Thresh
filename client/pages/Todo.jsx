import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div className="bg-primary-500 rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 text-center">
      <div className="text-xl break-words">dsfasdfsdf</div>
      <ul className="text-secondary-200 break-words text-left list-disc -mr-3">
        <li>
          dsafadsfasdfasdfdsafasfasdfadsfadsfasfasdfsadfdsafasdfadsfasfsadfsadfsdf
        </li>
      </ul>
    </div>
    // <div className="bg-primary-500 rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 text-center">
    //   <div className="text-xl break-words">{todo.title}</div>
    //   <ul className="text-secondary-200 break-words text-left list-disc -mr-3">
    //     <li>
    //       {todo.text}
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Todo;
