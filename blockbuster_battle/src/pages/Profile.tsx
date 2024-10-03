import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axiosInstancePromise from "../utils/axiosInstance";

// This is the main Profile component
const Profile: React.FC = () => {
  const [email, setEmail] = useState("example@email.com"); // Example email
  const [topScore, setTopScore] = useState<number>(0); // Default topScore to 0
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetch user data (this could be from an API, local storage, etc.)
  useEffect(() => {
    // Check if "jwtToken" exists in localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    const username: string =
      localStorage.getItem("username") || "example@gmail.com";
    setEmail(username);
    if (!jwtToken) {
      // Redirect to login page if jwtToken is not set
      navigate("/");
      return;
    }

    const fetchUserTopScore = async (): Promise<void> => {
      try {
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
          console.error("No username found in localStorage");
          return;
        }

        const axiosInstance = await axiosInstancePromise;
        const response = await axiosInstance.get(
          `/getTopScore/${storedUsername}`
        );

        setTopScore(response.data[0].topscore); // Set the topScore state with the fetched value
        console.log("TOP SCORE ", response.data[0].topscore);

        if (topScore !== undefined) {
          console.log("log");
        } else {
          console.error("Top score not found in response data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserTopScore();
  }, [navigate]); // Adding navigate to the dependency arra

  // Handler for navigating back to the home page
  const handleBack = () => {
    navigate("/play"); // Go back to the home page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-20 px-8">
        <div className="w-full max-w-screen-md mx-auto">
          <div className="flex flex-row items-center justify-between mb-6">
            <button
              type="button"
              onClick={handleBack}
              className="text-blue-500 hover:text-blue-600 transition-colors text-lg md:text-xl mr-4"
            >
              &larr; Back
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Profile
            </h1>
          </div>

          {/* Display user profile with labels on the left and input fields on the right */}
          <div className="mb-6 flex items-center">
            <label className="w-1/4 text-gray-400 text-right mr-4">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-3/4 px-6 py-4 rounded border border-gray-600 bg-transparent text-black"
            />
          </div>

          <div className="mb-6 flex items-center">
            <label className="w-1/4 text-gray-400 text-right mr-4">
              Top Score
            </label>
            <input
              type="number"
              value={topScore}
              readOnly
              className="w-3/4 px-6 py-4 rounded border border-gray-600 bg-transparent text-black"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
