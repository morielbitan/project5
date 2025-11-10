import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function locateUser(usersArr) {
    const foundItem = usersArr.find((item) => item["username"] === username);
    if (foundItem) return foundItem;
    else return {};
  }

  function isPwdCorrect(userObj) {
    return userObj["website"] === password;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const jsonData = await response.json();

        const foundUser = locateUser(jsonData);

        if (Object.keys(foundUser).length === 0 || !isPwdCorrect(foundUser))
          throw new Error("wrong username/ password");
        else {
          console.log(`username ${username} with password ${password} exists!`);
          localStorage.setItem("userInfo", JSON.stringify(foundUser));
          navigate("/home");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // show the error to the user in the page -----
      }
    };

    fetchData();
  }

  return (
    <>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
