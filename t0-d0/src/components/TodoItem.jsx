/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [image, setImage] = useState(localStorage.getItem(`todoImage-${todo.id}`) || '');
  const [description, setDescription] = useState(localStorage.getItem(`todoDescription-${todo.id}`) || '');
  const [isImageLarge, setIsImageLarge] = useState(false);
  const [isPhotoFieldVisible, setIsPhotoFieldVisible] = useState(false);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  useEffect(() => {
    if (image) {
      localStorage.setItem(`todoImage-${todo.id}`, image);
    }
    localStorage.setItem(`todoDescription-${todo.id}`, description);
  }, [image, description, todo.id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className="flex flex-col border border-black/10 rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black bg-[#ccbed7]">
      {/* Main Todo Item Content */}
      <div className="flex gap-x-3 items-center">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
          } ${todo.completed ? 'line-through' : ''}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />

        {/* Buttons */}
        <div className="flex items-center gap-x-2">
          {/* Dropdown Toggle Button */}
          <button
            className="inline-flex w-8 h-8 rounded-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => setIsPhotoFieldVisible((prev) => !prev)}
          >
            <img src="/down-chevron.png" alt="Toggle" className="w-6 h-6" />
          </button>

          {/* Camera Button (Now Triggers File Upload) */}
          <label className="inline-flex w-8 h-8 rounded-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 cursor-pointer">
            📷
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Edit Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          <img src="/edit.png" alt="Edit" className="w-6 h-6" />
        </button>

        {/* Delete Button */}
        <button
          className="inline-flex w-8 h-8 rounded-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => deleteTodo(todo.id)}
        >
          <img src="/delete.png" alt="Delete" className="w-6 h-6" />
        </button>
      </div>

      {/* Image & Description Fields (Hidden until toggled) */}
      {isPhotoFieldVisible && (
        <div className="flex gap-3 mt-3">
          {/* Image Box */}
          <div
            className="w-32 h-32 bg-gray-200 rounded-lg border border-black/10 flex justify-center items-center shadow-md cursor-pointer"
            onClick={() => setIsImageLarge(true)}
          >
            {image ? (
              <img src={image} alt="Uploaded" className="w-full h-full rounded-lg" />
            ) : (
              <p className="text-gray-700"> Upload Image </p>
            )}
          </div>

          {/* Description Box (Expands to the Delete Button) */}
          <textarea
            className="flex-1 h-32 bg-gray-200 rounded-lg border border-black/10 p-2 outline-none shadow-md resize-none"
            placeholder="Write about the photo..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}

      {/* Enlarged View of Image */}
      {isImageLarge && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative">
            <img src={image} alt="Uploaded" className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg" />
            <button
              className="absolute top-3 right-3 text-white bg-red-500 px-3 py-1 rounded-full"
              onClick={() => setIsImageLarge(false)}
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
