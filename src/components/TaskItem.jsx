import { useState } from "react";
import { CheckCircle, Circle, Delete, Save, Pencil } from "lucide-react";
import clsx from "clsx";
import { useTask } from "../context/TaskContext";

export default function TaskItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMessage, setTodoMessage] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTask();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={clsx(
        "flex items-center mt-4 justify-between p-2 rounded-sm shadow-sm border dark:border-gray-700 text-l",
        todo.completed ? "bg-green-50 dark:bg-green-900/20" : ""
      )}
    >
      <div className="flex items-center gap-3 font-normal">
        <button
          onClick={() => toggleCompleted(todo.id)}
          onChange={toggleCompleted}
        >
          {todo.completed ? (
            <CheckCircle className="text-green-600" size={20} />
          ) : (
            <Circle className="text-stone-500" size={20} />
          )}
        </button>

        <textarea
          rows="1"
          wrap="hard"
          cols="70"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable
              ? " border-transparent font-semibold"
              : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
          value={todoMessage}
          onChange={(e) => setTodoMessage(e.target.value)}
          readOnly={!isTodoEditable}
        ></textarea>
      </div>
      <div>
        <button
          className=" rounded-lg text mr-4 bg-green-500 text-stone-50 p-1 hover:text-green-600 hover:bg-transparent  flex-col gap-10"
          onClick={() => {
            if (todo.completed) return ;
            else if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? <Save /> : <Pencil />}
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-400 text-stone-50 rounded-lg p-1 hover:text-red-400 hover:bg-transparent transition"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
}
