import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [userInfo, setUserInfo] = useState(null);
  const [sort, setSort] = useState("Chose how to sort");

  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  //   const [id, setId] = useState(1);
  useEffect(() => {
    const User = localStorage.getItem("userInfo");
    if (User) {
      setUserInfo(JSON.parse(User));
    } else {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    if (!userInfo) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/todos?userId=${userInfo.id}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setTodos(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userInfo]);
  const handleToggle = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Updated:", json);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };
  const handleChange = (e) => {
    setSort(e.target.value);
    if (e.target.value === "Alphabetical") {
      const sortedTodos = [...todos].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setTodos(sortedTodos);
    } else {
      if (e.target.value === "Id") {
        const sortedTodos = [...todos].sort((a, b) => a.id - b.id);
        setTodos(sortedTodos);
      } else {
        if (e.target.value === "Random") {
          const sortedTodos = [...todos].sort(() => 0.5 - Math.random());
          setTodos(sortedTodos);
        } else {
          if (e.target.value === "Completed") {
            const sortedTodos = [...todos].sort(
              (a, b) => a.completed - b.completed
            );
            setTodos(sortedTodos);
          }
        }
      }
    }
  };
  return (
    <>
      <div>
        <h1>Todos</h1>
        <select value={sort} onChange={handleChange}>
          <option value="Id">Id</option>
          <option value="Alphabetical">Alphabetical</option>
          <option value="Random">Random</option>
          <option value="Completed">Chek</option>
        </select>
        {todos.length === 0 ? (
          <p></p>
        ) : (
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                  {todo.title}
                </label>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export default Todos;
