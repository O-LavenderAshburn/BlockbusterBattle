import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  // Handle signout functionality
  const handleSignout = () => {
    console.log("User signed out");
    localStorage.removeItem('jwtToken'); // Change this to the name of the JWT token being used for user session

    // Navigate to the home page
    navigate('/');
  };

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-8 shadow-md fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center">
        {/* Left Side - Navigation Links */}
        <div className="flex space-x-6">
          <a
            href="/play"
            className="text-lg font-semibold hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="/play/gamepage"
            className="text-lg font-semibold hover:text-blue-400 transition-colors"
          >
            Play
          </a>
          <a
            href="/profile"
            className="text-lg font-semibold hover:text-blue-400 transition-colors"
          >
            Profile
          </a>
        </div>

        {/* Right Side - Profile and Signout Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleSignout}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors font-semibold"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
