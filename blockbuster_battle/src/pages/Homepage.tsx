import React from "react";
import image from "../assets/swords-2.png";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login"); // Navigate to the specified route
  };
  const handleClickSignup = () => {
    navigate("/signup"); // Navigate to the specified route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center">
          <img className="  w-40 h-40" src={image} alt="Logo" />
        </div>
      </div>
      <div>
        <h1>Blockbuster Battle</h1>
        <p>Where Ratings Clash, and Only the Hits Survive!</p>
      </div>
      <div className="flex flex-row gap-5">
        <button
          className=" border-none  transform transition-transform duration-300  hover:z-10 hover:scale-125 font-medium hover:origin-left  hover:bg-opacity-50 hover:bg-slate-200 hover:font-bold h-50px mt-6 "
          onClick={handleClickLogin}
        >
          {" \r Login  \r"}
        </button>
        <button
          className=" border-none  transform transition-all duration-300 font-medium  hover:z-10 hover:font-bold h-50px mt-6 hover:bg-opacity-50 hover:bg-slate-200 hover:origin-right hover:scale-125"
          onClick={handleClickSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;
