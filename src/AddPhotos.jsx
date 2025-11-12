import "./App.css";
import { useState } from "react";

function AddPhoto(props) {
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  async function addPhotoToDb(photo) {
    await fetch(`http://localhost:3000/photos`, {
      method: "POST",
      body: JSON.stringify(photo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setNewPhotoTitle("");
    setNewPhotoUrl("");
  }

  function handleSubmit(e) {
    // e.preventDefault();
    const newPhoto = {
      albumId: props.albumId,
      title: newPhotoTitle,
      url: newPhotoUrl,
    };
    addPhotoToDb(newPhoto);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>Add new photo:</h5>
        <input
          type="text"
          placeholder="Enter the photo's title"
          value={newPhotoTitle}
          onChange={(e) => setNewPhotoTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter the photo's url"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddPhoto;
