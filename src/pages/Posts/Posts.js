import "./Posts.css";
import useFetch from "../../hooks/useFetch";

const Posts = () => {
  const {
    data: posts,
    isPending,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="content">
      <h1>Posts</h1>
      <p className="description">
        Posts page to display data.
        <br />
        100 posts from JSON palcehoder API.
      </p>

      <div>{isPending && <h3>Loading posts...</h3>}</div>

      <div>{error && <h3>Error: {error}</h3>}</div>

      <div className="posts">
        {posts &&
          posts.map((post) => (
            <div className="post">
              <p>Post #{post.id}</p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
