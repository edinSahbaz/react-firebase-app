import { Link } from "react-router-dom";

const AuthError = () => {
  return (
    <div className="content">
      <h2>Please log in or register!</h2>
      <p>You must be registered / logged in to see this page.</p>
      <Link to="/" className="btn">
        Register / Log In Form
      </Link>
    </div>
  );
};

export default AuthError;
