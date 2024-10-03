import React from "react";

interface RoundProps {
  round: number;
}
const RoundCounter: React.FC<RoundProps> = ({ round }) => {
  return (
    <div>
      <h1>Round: {round} </h1>
    </div>
  );
};
export default RoundCounter;
