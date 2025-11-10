import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Info from "./Info";
import { useState } from "react";
import Login from "./Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/info">Info</Link>
            </li>
            <li>
              <Link to="/Albums">Albums</Link>
            </li>
            <li>
              <Link to="/Posts">Posts</Link>
            </li>
            <li>
              <Link to="/Todos">Todos</Link>
            </li>
            <li>
              <Link to="/Logout">Logout</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          {/* <Route path="/Albums" element={<Albums />} /> */}
          {/* <Route path="/info" element={<Info />} />
          <Route path="/info" element={<Info />} />
          <Route path="/info" element={<Info />} />
          <Route path="/info" element={<Info />} />
          <Route path="/info" element={<Info />} /> */}

          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
  );
}

export default App;
export default App;
