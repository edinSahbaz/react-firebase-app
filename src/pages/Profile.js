import { useContext, useEffect, useState } from "react";
import AuthError from "../components/AuthError/AuthError";
import { UserContext } from "./../context/UserContext";
import { auth, db } from "./../config/firebase-config";
import { collection, updateDoc, getDocs, doc } from "firebase/firestore";

const Profile = () => {
  const { user: isLoggedIn } = useContext(UserContext);
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [bioId, setBioId] = useState("");
  const [updating, setUpdating] = useState(false);
  const usersBioRef = collection(db, "users-bio");

  const getBio = async () => {
    const res = await getDocs(usersBioRef);
    const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const bio = data.filter((obj) => obj.userId === isLoggedIn.uid);
    setBioId(bio[0]?.id);
    setBio(bio[0]?.biography);
  };

  const updateBio = async (id) => {
    setUpdating(true);
    const bioDoc = doc(db, "users-bio", id);
    const newData = { biography: newBio };
    await updateDoc(bioDoc, newData);
    setUpdating(false);
    setNewBio("");
    getBio();
  };

  useEffect(() => {
    getBio();
  });

  return (
    <div className="content">
      {isLoggedIn && (
        <div className="content ">
          <div className="textCenter">
            <h2>Profile of {auth.currentUser.displayName}</h2>
            <p>Change your profile settings from this page.</p>
            <p>
              To change your profile biography, enter the new one below and
              confirm on <strong>Submit</strong>.
            </p>
          </div>
          <div className="textCenter">
            <h3>Current bio:</h3>
            {!bio && <p>Loading...</p>}
            {bio && <em>{bio}</em>}
          </div>
          <textarea
            onChange={(e) => setNewBio(e.target.value)}
            value={newBio}
            className="editBio"
          ></textarea>

          <button onClick={() => updateBio(bioId)} className="btn">
            Submit
          </button>

          {updating && <p>Updating your bio...</p>}
        </div>
      )}
      {!isLoggedIn && <AuthError />}
    </div>
  );
};

export default Profile;
