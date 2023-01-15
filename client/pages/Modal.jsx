import React from 'react';

const Modal = ({
  newTodo,
  handleCloseModal,
  handleTodoTitle,
  handleTodoText,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-96 flex flex-col items-center justify-center gap-5 pb-4 bg-primary-500 bg-opacity-75 backdrop-blur-3xl"
    >
      <div
        onClick={handleCloseModal}
        className="self-end bg-tertiary-500 px-2 mr-3 mt-1 rounded-md cursor-pointer hover:bg-opacity-75"
      >
        x
      </div>
      <label className="text-secondary-500">
        Task
        <input
          value={newTodo.title}
          onChange={handleTodoTitle}
          className="bg-primary-500 ml-3 rounded-lg px-3"
        />
      </label>
      <label className="text-secondary-500">
        Task Details
        <input
          value={newTodo.text}
          onChange={handleTodoText}
          className="text-secondary-500 bg-primary-500 ml-3 mr-16 rounded-lg px-3 py-1"
        />
      </label>

      <button className="bg-tertiary-500 py-1 -mb-2 ">Add Task</button>
    </form>
  );
};

export default Modal;
