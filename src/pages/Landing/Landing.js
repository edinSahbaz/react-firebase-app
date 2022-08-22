import "./Landing.css";

const Landing = () => {
  return (
    <div className="content">
      <h2>Welcome to the Demo App!</h2>;
      <p>Please register or log in to access this app</p>
      <form>
        <h3>Login form</h3>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Landing;
