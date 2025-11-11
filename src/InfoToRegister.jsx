import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InfoToRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  async function addUserToDb(user) {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    await response.then((response) => response.json());
  }

  function handleSubmit() {
    const existing = JSON.parse(localStorage.getItem("userInfo"));
    const updated = {
      ...existing,
      name: name,
      email: email,
      phone: phone,
    };
    localStorage.setItem("userInfo", JSON.stringify(updated));
    addUserToDb(updated);

    navigate("/home");
  }

  return (
    <>
      <h1>More Information To Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default InfoToRegister;
