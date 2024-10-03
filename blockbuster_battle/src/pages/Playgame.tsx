import React, { useEffect } from "react";
import image from "../assets/swords-2.png";
import PlayButton from "../components/PlayButton";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Playgame: React.FC = () => {
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Check if "username" exists in localStorage
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    if (!token) {
      // Redirect to login page if username is not set
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center">
            <img className="  w-40 h-40" src={image} alt="Logo" />
          </div>
        </div>
        <div>
          <h1>Click Start To Play</h1>
        </div>
        <PlayButton text="Play Game"></PlayButton>
      </div>
    </>
  );
};

export default Playgame;
