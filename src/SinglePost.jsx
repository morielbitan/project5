import { useState } from "react";
import Comments from "./Comments";

function SinglePost(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function handleEdit(postId) {
    console.log("handle later for post- ", postId);
  }

  async function deletePostFromDb(postId) {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handleDelete(postId) {
    deletePostFromDb(postId);
    props.setPosts(props.posts.filter((post) => post["id"] !== postId));
  }

  return (
    <>
      <div className={isExpanded ? "expanded" : "notExpanded"}>
        <h4>ID: {props.post.id}</h4>
        <h3>{props.post.title}</h3>

        {isExpanded && (
          <>
            <p>{props.post.body}</p>
            {showComments && <Comments postId={props.post.id} />}
            <button onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide comments" : "Show comments"}
            </button>
          </>
        )}

        <button onClick={() => handleEdit(props.post.id)}>Edit Post</button>
        <button onClick={() => handleDelete(props.post.id)}>Delete Post</button>

        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
}

export default SinglePost;
