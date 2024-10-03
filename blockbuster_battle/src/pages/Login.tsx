import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs"; // Import
import axios from "axios";
import axiosInstancePromise from "../utils/axiosInstance";
// This is the main Login component using React Functional Components and hooks
const Login: React.FC = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const [emailError, setEmailError] = useState(false); // State for email validation error
  const [passwordError, setPasswordError] = useState(false); // State for password validation error
  const navigate = useNavigate(); // React Router hook for navigation

  interface LoginResponse {
    token?: string;
    // Include other fields that your API might return
  }

  const loginToAccount = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const axiosInstance = await axiosInstancePromise;
      const response = await axiosInstance.post<LoginResponse>("/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data.token);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("jwtToken", token);
      }
      localStorage.setItem("username", username);

      navigate("/play");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response && error.response.status === 401) {
          console.error("Invalid username or password");
          // Handle invalid credentials, e.g., show an error message to the user
        } else {
          console.error("Error logging in:", error.message);
          // Handle other errors, e.g., show a generic error message
        }
      } else {
        console.error("Unexpected error:", error);
      }
      throw error; // Optionally re-throw the error if you want to handle it further up the call stack
    }
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setEmailError(false);
    setPasswordError(false);
    setError("");

    // Email validation
    if (!email) {
      setEmailError(true);
      setError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setError("Please enter a valid email address.");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError(true);
      setError("Password is required.");
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      try {
        //const saltRounds = 10;
        //const hashedPassword = await bcrypt.hash(password, saltRounds);

        loginToAccount(email, password);
      } catch (error) {
        setError("An error occured while processing your request.");
        console.error("Error hashing password:", error);
      }
    }
  };

  // Handler for navigating back to the home page
  const handleBack = () => {
    navigate("/"); // Go back to the home page
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-screen-xl">
        {" "}
        {/* Adjusted width */}
        {/* Flex container with responsive alignment */}
        <div className="flex flex-row items-center justify-between mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="text-blue-500 hover:text-blue-600 transition-colors text-lg md:text-xl mr-4"
          >
            &larr; Back
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-6 py-4 rounded border ${
                emailError ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-4 focus:ring-blue-500 bg-transparent `}
              style={{ maxWidth: "100%" }} // Ensure full width
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-6 py-4 rounded border ${
                passwordError ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-4 focus:ring-blue-500 bg-transparent `}
              style={{ maxWidth: "100%" }} // Ensure full width
            />
          </div>
          {error && <p className="mb-6 text-lg text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition-colors text-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
