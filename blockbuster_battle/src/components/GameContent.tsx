import { useState, useEffect, ReactElement } from "react";
import React from "react";
import Card from "./card";
import Popup from "./Popup";
import RoundCounter from "./RoundCounter";
import axiosInstancePromise from "../utils/axiosInstance";

const GameContent: React.FC = () => {
  const [round, setRounds] = useState<number>(1);
  const [components, setComponents] = useState<ReactElement[]>([]);
  const [isEndgame, setEndgame] = useState<boolean>(false);
  const [cardData, setCardData] = useState<
    { text: string; image_link: string; score: number }[]
  >([]);
  const [totalScore, setTotalScore] = useState<number>(0); // State to keep track of the total score
  const [errorMessage, setErrorMessage] = useState<string | null>(
    localStorage.getItem("errorMessage") || null
  ); // State to track API errors, with localStorage

  // Function to generate a single Card component
  const generateCard = (
    text: string,
    image_link: string,
    score: number
  ): ReactElement => {
    return <Card text={text} image_link={image_link} score={score} />;
  };

  // Card data structure to keep card information
  const generateCardData = (
    text: string,
    image_link: string,
    score: number
  ) => {
    return { text, image_link, score };
  };

  // Fetch movie data from the API
  const fetchMovieData = async (): Promise<
    { title: string; poster: string; rating: number }[]
  > => {
    try {
      const axiosInstance = await axiosInstancePromise;

      const response = await axiosInstance.get("/getTwoMovies");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching movie data:", error);

      // Default error message
      let errorMsg = "Failed to fetch movie data |";

      if (error.response) {
        // If the error has a response, extract the status and message
        const statusCode = error.response.status;
        const responseMessage =
          error.response.data?.message || error.response.statusText;
        errorMsg += ` Status Code: ${statusCode}, Message: ${responseMessage}`;
      } else if (error.request) {
        // If the error is related to a network issue (request made but no response)
        const errorCode = error.code || "UNKNOWN_ERROR";
        const errorMessage = error.message || "Unknown error occurred.";
        errorMsg += ` Error Code: ${errorCode} | Message: ${errorMessage}`;
      } else {
        // For other types of errors
        errorMsg += ` ${error.message}`;
      }

      // Optionally include config details for debugging (e.g., URL, timeout)
      if (error.config) {
        //errorMsg += ` (Request URL: ${error.config.url}, Timeout: ${error.config.timeout}ms)`;
      }

      setErrorMessage(errorMsg);
      localStorage.setItem("errorMessage", errorMsg); // Save error message to localStorage

      // Optionally clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage(null);
        localStorage.removeItem("errorMessage"); // Clear localStorage when the error is removed
      }, 5000); // Error will disappear after 5 seconds

      return [];
    }
  };

  /**
   * posts score to database
   * @param score score to post
   *
   * @returns
   */
  const updateScores = async (newScore: number): Promise<void> => {
    try {
      const username = localStorage.getItem("username");
      const axiosInstance = await axiosInstancePromise;
      const response = await axiosInstance.post("/updateScore", {
        username,
        newScore,
      });
      return response.data;
    } catch (error) {
      console.error("Error Updating Scores ", error);
    }
  };

  // Generate two cards at the start of the game
  const generateTwoCards = async () => {
    const movieData = await fetchMovieData();
    if (movieData.length === 2) {
      const card1Data = generateCardData(
        movieData[0].title,
        movieData[0].poster,
        movieData[0].rating
      );
      const card2Data = generateCardData(
        movieData[1].title,
        movieData[1].poster,
        movieData[1].rating
      );

      setCardData([card1Data, card2Data]);
      setComponents([
        generateCard(card1Data.text, card1Data.image_link, card1Data.score),
        generateCard(card2Data.text, card2Data.image_link, card2Data.score),
      ]);
    }
  };

  // Function to handle card click
  const handleCardClick = async (index: number) => {
    setRounds((round) => round + 1);
    const [card1, card2] = cardData;
    const clickedCard = cardData[index];

    // Check if the clicked card has the highest score
    if (clickedCard.score >= card1.score + card2.score - clickedCard.score) {
      // Update total score if the clicked card has the highest score
      setTotalScore(totalScore + 1);
    }

    // Fetch a new movie for the new card
    const newMovieData = await fetchMovieData();
    if (newMovieData.length > 0) {
      const newCardData = generateCardData(
        newMovieData[0].title,
        newMovieData[0].poster,
        newMovieData[0].rating
      );

      // Update card positions: the right card becomes the left, and a new card is added to the right
      setCardData([card2, newCardData]);

      // Update components, add the new card data and the old card data
      setComponents([
        generateCard(card2.text, card2.image_link, card2.score),
        generateCard(
          newCardData.text,
          newCardData.image_link,
          newCardData.score
        ),
      ]);
    }
    //check if the rounds is at the end of the game
    if (round === 10) {
      setRounds(0);
      postScoresAndReset();
    }
  };

  // At the end of the game post results to server and show the endgame popup
  const postScoresAndReset = () => {
    updateScores(totalScore);
    setEndgame(true);
  };

  // Clear errorMessage from localStorage on initial load if it exists
  useEffect(() => {
    // if (errorMessage) {
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //     localStorage.removeItem("errorMessage"); // Clear localStorage
    //   }, 5000); // Error will disappear after 5 seconds
    // }
    generateTwoCards();
  }, []);

  return (
    <div>
      <Popup final_score={totalScore} isOpen={isEndgame}></Popup>
      {/* Popup for errors */}
      {errorMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2">
          {errorMessage}
        </div>
      )}
      <div>
        <RoundCounter round={round}></RoundCounter>
      </div>
      <div className="flex flex-col">
        <div>
          <h1>Which Movie Is Rated Higher</h1>
        </div>
        <div>
          <div className="flex flex-row justify-center space-x-4">
            <div className="card-div" onClick={() => handleCardClick(0)}>
              {components[0]} {/* Place the left card here */}
              Score: {cardData[0]?.score.toFixed(1)}{" "}
              {/* Display the score of the left card */}
            </div>
            <div className="card-div" onClick={() => handleCardClick(1)}>
              {components[1]} {/* Place the right card here */}
            </div>
          </div>
          <div>
            <div className="mt-4">Total Score: {totalScore.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContent;
