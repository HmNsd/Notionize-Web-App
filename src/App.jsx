import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { TaskProvider } from "./context/index.js";
import TaskItem from "./components/TaskItem";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export default function App() {
  const { darkMode } = useContext(ThemeContext);

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TaskProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div
        className={clsx(
          " min-h-screen transition-colors",
          darkMode
            ? "bg-gradient-to-r from-stone-700 via-black to-stone-700 text-white"
            : "bg-gradient-to-r from-gray-400 via-white to-stone-400 text-black"
        )}
      >
        <div className=" sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[55vw] mx-auto p-6">
          <Header />
          <TaskInput />
          <hr className={`border-t rounded-full border my-4`} />

          {/* Filters
          <div className="flex gap-3 mb-4 justify-center">
            {["all", "pending", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-5 py-1 rounded-full text-md font-light border",
                  filter === f ? "bg-orange-500 text-white" : " "
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div> */}

          {/* Task List */}
          <ul className="space-y-3">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskItem todo={todo} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </TaskProvider>
  );
}
