import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global styles
import "./index.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Landing from "./pages/Landing";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import { UserContext } from "./context/UserContext";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState("");

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
