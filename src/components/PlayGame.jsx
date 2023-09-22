import React, { useState } from "react";
import { useEffect } from "react";

function PlayGame(props) {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState("lost");
  const [buttonColorClass, setButtonColorClass] = useState("hover:text-green-500");

  useEffect(() => {
    if (props.gamemode === "medium") {
      setButtonColorClass("hover:text-yellow-400")
    } else if (props.gamemode === "hard") {
      setButtonColorClass("hover:text-red-500")
    }
  }, [])


  const countries = [
    "kr",
    "se",
    "id",
    "ca",
    "za",
    "br",
    "jp",
    "dk",
    "bt",
    "fr",
    "ru",
    "au",
    "it",
    "in",
  ];

  const obj = {
    easy: countries.slice(0, 6),
    medium: countries.slice(0, 10),
    hard: countries,
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [randomCountries, setRandomCountries] = useState([]);

  useEffect(() => {
    const shuffledArray = shuffle(obj[props.gamemode]);
    setRandomCountries(shuffledArray);
  }, [props.gamemode]);

  const [clickedCountry, setClickedCountry] = useState([]);

  const handleRandomizeClick = (e) => {
    if (clickedCountry.includes(e.target.alt) === false) {
      if (currScore >= bestScore) {
        setBestScore(currScore + 1);
      }

      setCurrScore(currScore + 1);
      setClickedCountry([...clickedCountry, e.target.alt]);

      if (currScore + 1 === obj[props.gamemode].length) {
        setGameState("won");
      }
    } else {
      setGameState("lost");
    }
    const shuffledArray = shuffle(obj[props.gamemode]);
    setRandomCountries(shuffledArray);
  };

  const playAgain = () => {
    setCurrScore(0);
    setClickedCountry([]);
    setGameState("playing");
  };

  if (gameState === "playing") {
    return (
      <div>
        <h1>Game Starting</h1>
        <h2>Score: {currScore}</h2>
        <h2>High Score: {bestScore}</h2>
        <h2>Playing on {props.gamemode} difficulty</h2>
        {randomCountries.map((country, index) => (
          <img
            key={index}
            src={`https://flagcdn.com/w320/${country}.png`}
            alt={country}
            onClick={(e) => {
              handleRandomizeClick(e);
            }}
          />
        ))}
      </div>
    );
  } else if (gameState === "lost") {
    return (
      <div className="bg-slate-950 w-screen h-screen text-slate-200 text-2xl flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-8">Game Over</h1>
        <h2>Your Score is {currScore}</h2>
        <h2>High Score is {bestScore}</h2>
        <button
          className= {`px-7 bg-slate-900 ${buttonColorClass} py-3 rounded-xl hover:bg-slate-800 mt-8`}
          onClick={playAgain}
        >
          Play Again?
        </button>
      </div>
    );
  } else if (gameState === "won") {
    return (
      <div className="bg-slate-950 w-screen h-screen text-slate-200 text-2xl flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-8">You Win!!</h1>
        <button
          className= {`px-7 bg-slate-900 ${buttonColorClass} py-3 rounded-xl hover:bg-slate-800`}
          onClick={playAgain}
        >
          Play Again?
        </button>
      </div>
    );
  }
}

export default PlayGame;
