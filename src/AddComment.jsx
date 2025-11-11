import "./App.css";
import { useState } from "react";

function AddComment(props) {
  const [newComment, setNewComment] = useState("");

  async function addCommentToDb(comment) {
    await fetch("http://localhost:3000/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setNewComment("");
  }

  function handleSubmit() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const fullComment = {
      postId: props.postId,
      name: userInfo["name"],
      email: userInfo["email"],
      body: newComment,
    };
    addCommentToDb(fullComment);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5>Add new comment:</h5>

        <input
          type="text"
          placeholder="Enter the comment's body"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddComment;
