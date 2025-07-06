// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/quiz");
  };

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "200px" }}
      >
        <h1 className="text-center">Welcome!!! </h1>
      </div>
      <h2>
        Click the "Start Now" button to start playing😁
        <br />
        <br />
        <button
          onClick={handleClick}
          className="btn btn-primary"
          style={{ fontSize: "24px" }}
        >
          Start Now
        </button>
      </h2>
    </div>
  );
}

export default Home;