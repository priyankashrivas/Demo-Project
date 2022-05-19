
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const App = () => {
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileCell, setProfileCell] = useState("");
  const [profileImage, setProfileImage] = useState("");
  

  const profileData = async () => {
    try {
      const res = await axios.get("https://randomuser.me/api/");
      // const res = await axios.get("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8");
      setProfileCell(res.data.results[0].cell);
      setProfileEmail(res.data.results[0].email);
      setProfileImage(res.data.results[0].picture.large);
      setProfileName(
        `${res.data.results[0].name.first} ${res.data.results[0].name.last}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <div className="main">
    
      <div className="card">
        <img src={profileImage} style={{ width: "100%" }} />
        <h1>{profileName}</h1>
        <p className="title">{profileEmail}</p>
        <p>{profileCell}</p>
        <p>
          <button>Other Details</button>
        </p>
        <button  onClick={() => profileData()}>New Person</button><br/>
      </div>
    </div>
  );
};

export default App;

