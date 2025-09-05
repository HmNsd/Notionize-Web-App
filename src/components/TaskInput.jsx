import { useContext, useState } from "react";
import { useTask } from "../context/index.js";
import { ThemeContext } from "../context/ThemeContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTask();

  const { darkMode } = useContext(ThemeContext);

  const add = (e) => {
    e.preventDefault();
// (  : setTodo(e.target.value))
    if (!todo) return;

    else if(todo.trim()==false){
      window.alert("Task can't be empty")
    }
    else{

    addTodo({ todo, completed: false });
    setTodo("");}
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className={`w-full border rounded-l px-3 outline-none ${
          darkMode === true ? "placeholder-stone-300" : "placeholder-stone-700"
        } duration-150 py-1.5`}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Add a task...")}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
