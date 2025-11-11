import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

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

  function photos(id) {
    navigate(`${id}/photos`);
  }
  const filteredAlbums = searchId
    ? albums.filter((album) => album.id.toString() === searchId)
    : albums;

  return (
    <>
      <div>
        <h1>Albums</h1>
        <h2>Search a album:</h2>

        <input
          type="number"
          placeholder="Search by todo ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {albums.length === 0 ? (
          <p>No todo found.</p>
        ) : (
          <ol>
            {filteredAlbums.map((album) => (
              <li key={album.id}>
                <label>
                  {album.title}
                  <button onClick={() => photos(album.id)}>View</button>
                </label>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

export default Albums;
