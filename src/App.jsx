import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Info from "./Info";
import Login from "./Login";
import Register from "./Register";
import InfoToRegister from "./InfoToRegister";

function MainLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
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
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
          <Route path="/infoToRegister" element={<InfoToRegister />} />

        <Route element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="Todos" element={<Todos />} />

          <Route path="/Logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
