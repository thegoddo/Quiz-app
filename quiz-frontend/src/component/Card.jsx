import React, { useState, useEffect } from "react";
import QuizService from "../services/quiz.service";
import authService from "../services/auth.service";

function Card() {
  const [score, setScore] = useState(0);
  const [allCountries, setAllCountries] = useState([]);
  const [remainingCountries, setRemainingCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = authService.getCurrentUser();

  const pickRandomCountry = (countriesToPickFrom) => {
    if (!countriesToPickFrom || countriesToPickFrom.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * countriesToPickFrom.length);
    return countriesToPickFrom[randomIndex];
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await QuizService.getQuestions();
        setAllCountries(data);
        setRemainingCountries(data);
        setCurrentCountry(pickRandomCountry(data));
      } catch (err) {
        console.error("Failed to fetch quiz questions:", err);
        setError("Failed to load quiz questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (
      remainingCountries.length === 0 &&
      !quizEnded &&
      allCountries.length > 0
    ) {
      setQuizEnded(true);
      setCurrentCountry(null);
      console.log("Quiz has ended!");
    }
  }, [remainingCountries, quizEnded, allCountries.length]);

  const handleAnswerClick = (selectedOption) => {
    if (currentCountry && selectedOption === currentCountry.capital) {
      setScore((prevScore) => prevScore + 10);
    }

    const updatedRemainingCountries = remainingCountries.filter(
      (country) => country.id !== currentCountry.id
    );

    setRemainingCountries(updatedRemainingCountries);

    if (updatedRemainingCountries.length === 0) {
      setQuizEnded(true);
      setCurrentCountry(null);
    } else {
      setCurrentCountry(pickRandomCountry(updatedRemainingCountries));
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setRemainingCountries(allCountries);
    setCurrentCountry(pickRandomCountry(allCountries));
    setQuizEnded(false);
  };

  if (loading) {
    return <div>Loading quiz questions...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", margin: "50px" }}>
        {error}
      </div>
    );
  }

  if (quizEnded) {
    if (score > user.score) QuizService.updateScore(score);
    return (
      <div style={{ textAlign: "center", margin: "50px", fontSize: "24px" }}>
        <h2>Quiz Over!</h2>
        <h3>Final Score: {score}!!!</h3>
        <p>You've answered all the questions. Great job!</p>
        <button className="btn btn-primary" onClick={handlePlayAgain}>
          Play Again!!!
        </button>
      </div>
    );
  }

  if (!currentCountry) {
    return <div>No questions available to start the quiz.</div>;
  }

  const correctCapital = currentCountry.capital;

  const incorrectCapitals = allCountries
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
      {/* TODO: Make it work */}
      {/* Highest Score is note working */}
      {/* <h3>Your Highest Score: {user.score}</h3> */}
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
