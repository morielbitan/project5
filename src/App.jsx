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
import Todos from "./Todos";
import Login from "./Login";
import Logout from "./Logout";
import Albums from "./Albums";
import Register from "./Register";
import InfoToRegister from "./InfoToRegister";
import Posts from "./Posts";
import Photos from "./Photos";

function MainLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="home/info">Info</Link>
          </li>
          <li>
            <Link to="home/albums">Albums</Link>
          </li>
          <li>
            <Link to="home/posts">Posts</Link>
          </li>
          <li>
            <Link to="home/todos">Todos</Link>
          </li>
          <li>
            <Link to="home/logout">Logout</Link>
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
        <Route path="/register" element={<Register />} />
        <Route path="/infoToRegister" element={<InfoToRegister />} />

        <Route element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="home/posts" element={<Posts />} />
          <Route path="home/todos" element={<Todos />} />
          <Route path="home/info" element={<Info />} />
          <Route path="home/logout" element={<Logout />} />
          <Route path="home/albums" element={<Albums />} />
          <Route path="home/albums/:id/photos" element={<Photos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
