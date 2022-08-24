import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { UserContext } from "./../context/UserContext";
import AuthError from "../components/AuthError/AuthError";

const Posts = () => {
  const {
    data: posts,
    isPending,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  const { user: isLoggedIn } = useContext(UserContext);

  return (
    <div className="content">
      {isLoggedIn && (
        <div className="content">
          <h1>Posts</h1>
          <p className="description">
            Posts page to display data.
            <br />
            100 posts from JSON palcehoder API.
          </p>

          <div>{isPending && <h3>Loading posts...</h3>}</div>

          <div>{error && <h3>Error: {error}</h3>}</div>

          <div className="cards">
            {posts &&
              posts.map((post) => (
                <div className="card" key={post.id}>
                  <p>Post #{post.id}</p>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {!isLoggedIn && <AuthError />}
    </div>
  );
};

export default Posts;
