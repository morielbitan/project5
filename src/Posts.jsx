import "./App.css";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";

function Posts() {
  const [posts, setPosts] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userInfo"))["id"];
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          `http://localhost:3000/posts?userId=${userId}`
        );
        const jsonData = await response.json();
        setPosts(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) getPosts();
  }, [userId]);

  function deletePostFromDb(postId) {}

  function handleDelete(postId) {
    deletePostFromDb(postId);
  }

  const filteredPosts = searchId
    ? posts.filter((post) => post.id.toString() === searchId)
    : posts;

  return (
    <>
      <div>
        <h1>Posts</h1>

        <AddPost userId={userId} />

        <h5>Search a post:</h5>

        <input
          type="number"
          placeholder="Search by post ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {loading ? (
          <p>Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <h4>ID: {post.id}</h4>
                <h3>{post.title}</h3>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Posts;
