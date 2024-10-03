interface PopupProps {
  isOpen: boolean;
  final_score: number;
}

const Popup: React.FC<PopupProps> = ({ isOpen, final_score }) => {

  
  const handleClick = () => {
    window.location.reload();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="popup-content bg-black p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Game Over!</h2>
        <p className="mb-4">Congratulations on completing the game!</p>
        <p> You got a score of {final_score}</p>
        <div>
          <button
            className=" border-none hover:z-10 hover:scale-105 font-medium transform transition-transform duration-300  hover:bg-opacity-50 hover:bg-slate-200 hover:font-bold"
            onClick={handleClick}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
