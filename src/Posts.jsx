import "./App.css";
import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import AddPost from "./AddPost";

function Posts() {
  const [posts, setPosts] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userInfo"))["id"];
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    async function getPosts() {
      try {
        console.log(`http://localhost:3000/posts?userId=${userId}`);
        const response = await fetch(
          `http://localhost:3000/posts?userId=${userId}`
        );
        const jsonData = await response.json();
        setPosts(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    if (userId) getPosts();
  }, [userId]);

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
          type="text"
          placeholder="Search by post ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul>
            {console.log("the posts: ", posts)}
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <SinglePost post={post} posts={posts} setPosts={setPosts} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Posts;
