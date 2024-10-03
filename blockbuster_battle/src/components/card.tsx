import React from "react";

interface CardProps {
  text: string;
  image_link: string;
  score: number;
}

const Card: React.FC<CardProps> = ({ text, image_link, score }) => {
  return (
    <div
      defaultValue={score}
      className="w-36 mr-2 ml-2 transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <img src={image_link} alt="Card" />
      <p> {text}</p>
    </div>
  );
};

export default Card;
