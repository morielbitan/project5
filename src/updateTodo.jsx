import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function UpdateTodo() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

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
  const handleToggle = (id, newtitle) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = { ...todoToUpdate, title: newtitle };

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
  return (
    <>
      <div>
        <h1>Home</h1>
        <button onClick={handleToggle()}>Update</button>
      </div>
    </>
  );
}

export default UpdateTodo;
