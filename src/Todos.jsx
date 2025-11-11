import { useState, useEffect } from "react";
import "./App.css";

function Todos() {
  const [todos, setTodos] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const jsonData = await response.json();

        // const foundUser = locateUser(jsonData);
        console.log(JSON.stringify(jsonData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //     function locateUser(usersArr) {
  //     const foundItem = usersArr.find((item) => item["username"] === username);
  //     if (foundItem) return foundItem;
  //     else return {};
  //   }


    const findById = (idToFind) => {
      return fetchData.find((item) => item.id === idToFind);
    };

    const handleSearch = () => {
      const result = findById(2);//לשלוח לו איזה ID לחפש
      console.log(result); // { id: 2, name: 'Eli' }
    };

  return (
    <>
      <div>
        <h1>Todos</h1>
        <p>{handleSearch}</p>
      </div>
    </>
  );
}

export default Todos;
