import { useEffect, useState } from "react";
import AddComment from "./AddComment";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  // console.log(localStorage.getItem("userId"));
  // console.log(JSON.parse(localStorage.getItem("userId")));
  // console.log(JSON.parse(localStorage.getItem("userId"))["id"]);

  const userName = JSON.parse(localStorage.getItem("userInfo"))["name"];

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(
          `http://localhost:3000/comments?postId=${postId}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    getComments();
  }, [postId]);

  async function deleteCommentFromDb(commentId) {
    try {
      await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handleDelete(commentId) {
    deleteCommentFromDb(postId);
    setComments(comments.filter((comment) => comment["id"] !== commentId));
  }

  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="comments">
      <h5>Comments:</h5>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>
            <strong>{comment.email}</strong>: {comment.body}
          </p>
          {comment["name"] === userName && (
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          )}
        </div>
      ))}
      <AddComment post={postId}></AddComment>
    </div>
  );
}

export default Comments;
