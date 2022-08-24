import { useContext } from "react";
import AuthError from "../components/AuthError/AuthError";
import { UserContext } from "./../context/UserContext";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user: isLoggedIn } = useContext(UserContext);

  const logout = async () => {
    signOut(auth);
  };

  return (
    <div className="content">
      {isLoggedIn && (
        <div className="content">
          <div className="textCenter">
            <h2 className="welcome">Hi, {auth.currentUser.displayName}!</h2>
            <h4>You have been logged in!</h4>
            <p>This is a your dashboard.</p>
            <p>Use the navigation to get to the other pages.</p>
            <p className="mt">
              To edit your profile go to {<Link to="/profile">profile</Link>}{" "}
              the page.
            </p>
            <button className="btn mt" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}

      {!isLoggedIn && <AuthError />}
    </div>
  );
};

export default Dashboard;
