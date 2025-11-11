import { useEffect, useState } from "react";
import AddComment from "./AddComment";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

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

  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="comments">
      <h5>Comments:</h5>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>
            <strong>{comment.email}</strong>: {comment.body}
          </p>
        </div>
      ))}
      <AddComment post={postId}></AddComment>
    </div>
  );
}

export default Comments;
