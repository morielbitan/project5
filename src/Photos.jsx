import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Albums from "./Albums";

function Photos() {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const [start, setStart] = useState(1);
  const limit = 10;

  useEffect(() => {
    const User = localStorage.getItem("userInfo");
    if (User) {
      setUserInfo(JSON.parse(User));
    } else {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    if (!userInfo || !id) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/photos?albumId=${id}&_sort=id&_order=asc&_start=${start}&_limit=${limit}`
        );
        const jsonData = await response.json();
        setPhotos((prev) => [...prev, ...jsonData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userInfo, id, start]);

  return (
    <>
      <div>
        <button onClick={() => navigate("/albums")}>Back to Albums</button>
        <h2>Photos for Album #{id}</h2>
        {photos.length === 0 ? (
          <p>No photos found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "15px",
              padding: "10px",
            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  background: "#f9f9f9",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  {photo.title}
                </p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setStart((prev) => prev + 10)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          טען עוד תמונות
        </button>
      </div>
    </>
  );
}

export default Photos;
