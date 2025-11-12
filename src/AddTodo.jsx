import "./App.css";
import { useState } from "react";

function AddTodo(props) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  async function addTodoToDb(todo) {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setNewTodoTitle("");
  }

  function handleSubmit() {
    const newTodo = {
      userId: props.userId,
      title: newTodoTitle,
      completed: false,
    };
    console.log("user id- ", props.userId);
    addTodoToDb(newTodo);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>Add new todo:</h5>
        <input
          type="text"
          placeholder="Enter the todo's title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddTodo;
