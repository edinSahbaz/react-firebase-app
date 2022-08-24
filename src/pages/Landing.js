import { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const Landing = () => {
  const [method, setMethod] = useState("Register");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const usersBioRef = collection(db, "users-bio");
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  const register = () => {
    setError("");
    setCreatingUser(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        updateProfile(auth.currentUser, { displayName: name }).then(
          async () => {
            const userId = auth.currentUser.uid;
            await addDoc(usersBioRef, { userId: userId, biography: bio });
            setCreatingUser(false);
            return navigate("/dashboard");
          }
        );
      })
      .then(async () => {})
      .catch((err) => {
        setError(err.message);
      });
  };

  const login = async () => {
    setError("");
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="content">
      {!user?.email && (
        <div className="content">
          <div className="textCenter">
            <h2>Welcome to the Demo App!</h2>
            <p>Please register or log in to access this app.</p>
          </div>
          <div className="loginForm">
            <h3>{method} form</h3>
            {method === "Register" && (
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {method === "Register" && (
              <textarea
                type="text"
                placeholder="Biography"
                onChange={(e) => setBio(e.target.value)}
              />
            )}

            {method === "Register" && (
              <button className="btn" onClick={register}>
                {method}
              </button>
            )}

            {method === "Log In" && (
              <button className="btn" onClick={login}>
                {method}
              </button>
            )}

            {error && <p className="error">{error}</p>}

            {method === "Log In" && (
              <p className="authMsg">
                Don't have an account?
                <span onClick={() => setMethod("Register")}>Register!</span>
              </p>
            )}
            {method === "Register" && (
              <p className="authMsg">
                Already have an account?
                <span onClick={() => setMethod("Log In")}>Sign in!</span>
              </p>
            )}
          </div>
        </div>
      )}
      {user?.email && (
        <div className="content textCenter">
          <h2>Home page</h2>
          <div>
            <p>Welcome to this demo website!</p>
            <p>Explore the pages using the navigation on top.</p>
          </div>
        </div>
      )}
      {creatingUser && (
        <div className="textCenter">
          <strong>Creating user...</strong>
          <p>You will be soon redirected to the dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Landing;
