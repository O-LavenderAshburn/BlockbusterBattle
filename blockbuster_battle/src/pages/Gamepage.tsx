import React, { useEffect } from "react";
import GameContent from "../components/GameContent";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Gamepage: React.FC = () => {
  // Explicitly type the components state as an array of React elements

  // Function to generate two Card components and store them in the array

  // useEffect to run generateCards once when the component is mounted
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Check if "username" exists in localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      // Redirect to login page if username is not set
      navigate("/");
    }
  }, [navigate]);
  
  return (
    <><NavBar />
    <div className="flex flex-col">
      <div>
        <GameContent></GameContent>
      </div>
    </div></>
  );
};

export default Gamepage;
