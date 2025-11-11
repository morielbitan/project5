import "./App.css";
import { useState } from "react";

function AddPost(props) {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  async function addPostToDb(post) {
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setNewPostTitle("");
    setNewPostBody("");
  }

  function handleSubmit() {
    const newPost = {
      userId: props.userId,
      title: newPostTitle,
      body: newPostBody,
    };
    console.log("user id- ", props.userId);
    addPostToDb(newPost);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>Add new post:</h5>
        <input
          type="text"
          placeholder="Enter the post's title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter the post's body"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddPost;
