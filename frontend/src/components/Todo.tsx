import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface Task {
  _id: string;
  task: string;
  completed: boolean;
}

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId) {
      inputRef.current?.focus();
    }
  }, [editingId]);

  useEffect(() => {
    try {
      const fetchTask = async () => {
        const response = await axios.get("https://full-stack-todo-app-pado.onrender.com/api/tasks");
        const tasks = response.data.tasks;
        setItems(tasks);
      };
      fetchTask();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAdd = async () => {
    try {
      if (inputValue.trim() === "") return;
      const response = await axios.post("https://full-stack-todo-app-pado.onrender.com/api/tasks", {
        task: inputValue,
      });
      const newData = response.data.newTask;
      setItems((prev) => [...prev, newData]);
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await axios.put(`https://full-stack-todo-app-pado.onrender.com/api/task/${id}`, {
        completed: !completed,
      });
      setItems((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://full-stack-todo-app-pado.onrender.com/api/task/${id}`);
      setItems((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      if(editText.trim() === "") return null
      await axios.put(`https://full-stack-todo-app-pado.onrender.com/api/task/${id}`, {
        task: editText,
      });
      setItems((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, task: editText } : task
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-amber-300 flex justify-center items-center h-screen">
      <div className="bg-amber-200 w-[500px] h-96 rounded-3xl">
        <div className="flex flex-col  py-4 text-center ">
          <h1 className="text-2xl font-bold">Task Planner</h1>
          <div className="mt-5  relative w-full px-5">
            <input
              type="text"
              className="bg-[#fff] outline-none border-none rounded-2xl pl-4 w-full text-lg py-2 pr-24"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              value={inputValue}
            />
            <button
              className="bg-red-400 border-none px-4 py-1 rounded-2xl absolute right-8 top-1.5"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <div>
            <ul className="mt-4 font-semibold text-md text-start w-full  overflow-y-auto pl-10 space-y-2 pr-6">
              {items.map((item) => (
                <li
                  key={item._id}
                  className={`pb-2 flex items-center  justify-between  gap-4 ${
                    item.completed ? "bg-green-500" : "bg-gray-200"
                  } ${
                    item.completed ? "text-black" : "text-gray-800"
                  } py-2 px-4 shadow-sm rounded-xl ${
                    item.completed ? "hover:bg-green-400" : "hover:bg-gray-300"
                  } transition duration-200`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-500"
                      checked={item.completed}
                      onChange={() => handleToggle(item._id, item.completed)}
                    />
                    {editingId === item._id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border-none bg-white text-black rounded-lg outline-none w-2/3 px-3 focus"
                        ref={inputRef}
                      />
                    ) : (
                      <span>{item.task}</span>
                    )}
                  </div>
                  <div className="flex gap-3 items-center">
                    {editingId === item._id ? (
                      <>
                        <button
                          className="py-1 bg-green-500 px-2 border-none rounded-lg text-black text-sm hover:bg-green-600 transition duration-200"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Update
                        </button>
                        <button
                          className="py-1 bg-red-500 px-2 border-none rounded-lg text-black text-sm hover:bg-red-600 transition duration-200"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="py-1 bg-red-500 px-2 border-none rounded-lg text-black text-sm hover:bg-red-600 transition duration-200"
                          onClick={() => {
                            setEditingId(item._id);
                            setEditText(item.task);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="py-1 bg-red-500 px-2 border-none rounded-lg text-black text-sm hover:bg-red-600 transition duration-200"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Todo;
