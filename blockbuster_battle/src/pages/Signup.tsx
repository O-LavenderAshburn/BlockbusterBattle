import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstancePromise from "../utils/axiosInstance";

// Function to calculate age based on date of birth
const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Function to check for sequential characters
const hasSequentialChars = (password: string) => {
  const seq = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seqReverse = seq.split("").reverse().join("");

  for (let i = 0; i < password.length - 2; i++) {
    const substr = password.slice(i, i + 3);
    if (seq.includes(substr) || seqReverse.includes(substr)) {
      return true;
    }
  }
  return false;
};

// Function to check for repeating characters (more than 3 consecutive repeats)
const hasRepeatingChars = (password: string) => {
  for (let i = 0; i < password.length - 3; i++) {
    if (password[i] === password[i + 1] &&
        password[i + 1] === password[i + 2] &&
        password[i + 2] === password[i + 3]) {
      return true;
    }
  }
  return false;
};

//Function to validate password based on NIST guidelines and additional checks
const validatePassword = async (password: string) => {
  const minLength = 8;
  const maxLength = 64;

  if (password.length < minLength) {
    return "Password must be at least 8 characters long.";
  }

  if (password.length > maxLength) {
    return "Password must not exceed 64 characters.";
  }

  if (hasSequentialChars(password)) {
    return "Password should not contain sequential characters (like '123' or 'abc').";
  }

  if (hasRepeatingChars(password)) {
    return "Password should not contain 4 or more repeating characters (like '1111' or 'aaaa').";
  }

  return ""; // Return empty string if password is valid
};


const Signup: React.FC = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for password confirmation input
  const [dateOfBirth, setDateOfBirth] = useState(""); // State for date of birth input
  const [error, setError] = useState(""); // State for error message
  const [emailError, setEmailError] = useState(false); // State for email validation error
  const [passwordError, setPasswordError] = useState(false); // State for password validation error
  const [confirmPasswordError, setConfirmPasswordError] = useState(false); // State for password confirmation error
  const [dateOfBirthError, setDateOfBirthError] = useState(false); // State for date of birth validation error
  const navigate = useNavigate(); // React Router hook for navigation

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const createUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const axiosInstance = await axiosInstancePromise;
      const response = await axiosInstance.post("/createUser", {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setDateOfBirthError(false);
    setError("");

    // Date of Birth validation
    if (!dateOfBirth) {
      setDateOfBirthError(true);
      setError("Date of Birth is required.");
      isValid = false;
    } else {
      const age = calculateAge(dateOfBirth);
      if (age < 18) {
        setDateOfBirthError(true);
        setError("You must be 18 or older to sign up.");
        isValid = false;
      }
    }

    // Password validation
    if (!password) {
      setPasswordError(true);
      setError("Password is required.");
      isValid = false;
    } else {
      const passwordErrorMessage = await validatePassword(password);
      if (passwordErrorMessage) {
        setPasswordError(true);
        setError(passwordErrorMessage);
        isValid = false;
      }
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setError("Passwords do not match.");
      isValid = false;
    }

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

    // If all validations pass
    if (isValid) {
      try {
        // Generate a UUID for the user

        // Send creds to the database
        createUser(email, password);
        navigate("/");
      } catch (err) {
        console.error("Error processing request:", err);
        setError("An error occurred while processing your request.");
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
        {/* Flex container with responsive alignment */}
        <div className="flex flex-row items-center justify-between mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="text-blue-500 hover:text-blue-600 transition-colors text-lg md:text-xl mr-4"
          >
            &larr; Back
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Signup</h1>
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
              } focus:outline-none focus:ring-4 focus:ring-blue-500 bg-transparent`}
              style={{ maxWidth: "100%" }}
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
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-6 py-4 rounded border ${
                confirmPasswordError ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-4 focus:ring-blue-500 bg-transparent`}
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="mb-6">
            <input
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={today} // Set the maximum date to today
              className={`w-full px-6 py-4 rounded border ${
                dateOfBirthError ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-4 focus:ring-blue-500 bg-transparent `}
              style={{ maxWidth: "100%" }}
            />
          </div>
          {error && <p className="mb-6 text-lg text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded hover:bg-blue-700 transition-colors text-xl"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
