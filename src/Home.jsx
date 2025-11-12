import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("userInfo");
    if (User) {
      setUserInfo(JSON.parse(User));
    } else {
      navigate("/");
    }
  }, [navigate]);
  if (!userInfo) {
    return <p>Loading user info...</p>;
  }

  return (
    <>
      <div>
        <h1>Home</h1>
        <h2>Hello {userInfo.username}</h2>
      </div>
    </>
  );
}

export default Home;
