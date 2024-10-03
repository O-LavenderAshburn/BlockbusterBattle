import React from "react";
import { useNavigate } from "react-router-dom";
interface PlayProps {
  text: string;
}
const PlayButton: React.FC<PlayProps> = ({ text }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/play/gamepage"); // Navigate to the specified route
  };

  return (
    <div className="flex items-center justify-center ">
      <button
        className=" border-none hover:z-10 hover:scale-125 font-medium transform transition-transform duration-300  hover:bg-opacity-50 hover:bg-slate-200 hover:font-bold"
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
};
export default PlayButton;
