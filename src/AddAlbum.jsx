import "./App.css";
import { useState } from "react";

function AddAlbum(props) {
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  async function addAlbumToDb(album) {
    await fetch("http://localhost:3000/albums", {
      method: "POST",
      body: JSON.stringify(album),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setNewAlbumTitle("");
  }

  function handleSubmit() {
    const newAlbum = {
      userId: props.userId,
      title: newAlbumTitle,
    };
    console.log("user id- ", props.userId);
    addAlbumToDb(newAlbum);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>Add new album:</h5>
        <input
          type="text"
          placeholder="Enter the album's title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddAlbum;
