import React, { useState, useEffect } from "react";

function Card() {
  const [score, setScore] = useState(0);
  const allDummyCountries = [
    {
      id: 1,
      name: "Togo",
      capital: "Lome",
      flagPngUrl: "https://flagcdn.com/w320/tg.png",
    },
    {
      id: 2,
      name: "India",
      capital: "New Delhi",
      flagPngUrl: "https://flagcdn.com/w320/in.png",
    },
    {
      id: 3,
      name: "United States",
      capital: "Washington, D.C.",
      flagPngUrl: "https://flagcdn.com/w320/us.png",
    },
    {
      id: 4,
      name: "Japan",
      capital: "Tokyo",
      flagPngUrl: "https://flagcdn.com/w320/jp.png",
    },
    {
      id: 5,
      name: "Brazil",
      capital: "Brasília",
      flagPngUrl: "https://flagcdn.com/w320/br.png",
    },
  ];

  const [remainingCountries, setRemainingCountries] =
    useState(allDummyCountries);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);

  const pickRandomCountry = (countriesToPickFrom) => {
    if (countriesToPickFrom.length === 0) {
      return null; // No countries left
    }
    const randomIndex = Math.floor(Math.random() * countriesToPickFrom.length);
    return countriesToPickFrom[randomIndex];
  };

  useEffect(() => {
    if (remainingCountries.length > 0 && !currentCountry) {
      setCurrentCountry(pickRandomCountry(remainingCountries));
    } else if (
      remainingCountries.length === 0 &&
      currentCountry === null &&
      !quizEnded
    ) {
      setQuizEnded(true);
    }
  }, [remainingCountries, currentCountry, quizEnded]); // Dependencies for useEffect

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === currentCountry.capital) {
      setScore(score + 10);
    }

    const updatedRemainingCountries = remainingCountries.filter(
      (country) => country.id !== currentCountry.id
    );

    setRemainingCountries(updatedRemainingCountries); // Update the list of remaining questions

    if (updatedRemainingCountries.length === 0) {
      setQuizEnded(true);
      setCurrentCountry(null); // Clear the current country
    } else {
      setCurrentCountry(pickRandomCountry(updatedRemainingCountries));
    }
  };

  const handlePlayAgain = () => {
    setRemainingCountries(allDummyCountries);
    setCurrentCountry(pickRandomCountry(remainingCountries));
    setQuizEnded(false);
  };

  if (quizEnded) {
    return (
      <div style={{ textAlign: "center", margin: "50px", fontSize: "24px" }}>
        <h2>Quiz Over!</h2>
        <h3>Score: {score}!!!</h3>
        <p>You've answered all the questions. Great job!</p>
        <button className="btn btn-primary" onClick={handlePlayAgain}>
          Play Again!!!
        </button>
      </div>
    );
  }

  if (!currentCountry) {
    return <div>Loading quiz question... or no questions available.</div>;
  }

  const correctCapital = currentCountry.capital;

  const incorrectCapitals = allDummyCountries
    .filter((c) => c.id !== currentCountry.id)
    .map((c) => c.capital);

  const numberOfIncorrectOptions = 3;
  const selectedIncorrectCapitals = [];

  const shuffledIncorrectCapitals = [...incorrectCapitals].sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i < numberOfIncorrectOptions; i++) {
    if (shuffledIncorrectCapitals.length > 0) {
      selectedIncorrectCapitals.push(shuffledIncorrectCapitals.pop());
    } else {
      break;
    }
  }

  const allOptions = [correctCapital, ...selectedIncorrectCapitals];
  const shuffledOptions = [...allOptions].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h3>Score: {score}</h3>
      <div
        className="card"
        style={{
          width: "18rem",
          margin: "20px auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={currentCountry.flagPngUrl}
          className="card-img-top"
          alt={`${currentCountry.name} Flag`}
          style={{
            width: "100%",
            height: "auto",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
        <div className="card-body" style={{ padding: "15px" }}>
          <h5
            className="card-title"
            style={{ fontSize: "1.5rem", marginBottom: "10px" }}
          >
            {currentCountry.name}
          </h5>
          <p className="card-text" style={{ color: "#555" }}>
            What is the capital of {currentCountry.name}?
          </p>
        </div>
        <div
          style={{
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {shuffledOptions.map((option, index) => (
            <button
              key={option + index}
              type="button"
              className="btn btn-outline-secondary"
              style={{
                fontSize: "16px",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
