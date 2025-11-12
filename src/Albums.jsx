import { useState, useEffect } from "react";
import "./App.css";
import AddAlbum from "./AddAlbum";
import { Link, useNavigate } from "react-router-dom";

function Albums() {
  const [userInfo, setUserInfo] = useState(null);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
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
          `http://localhost:3000/albums?userId=${userInfo.id}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setAlbums(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userInfo]);
  const filteredAlbums = searchId
    ? albums.filter((album) => album.id.toString() === searchId)
    : albums;

  return (
    <>
      <div className="div">
        <h1>Albums</h1>

        {userInfo && <AddAlbum userId={userInfo.id} />}

        <h2>Search a album:</h2>

        <input
          type="number"
          placeholder="Search by todo ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {albums.length === 0 ? (
          <p>No album found.</p>
        ) : (
          <ul>
            {filteredAlbums.map((album) => (
              <li
                key={album.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                  {album.id}
                </span>
                <Link
                  to={`${album.id}/photos`}
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  {album.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Albums;
