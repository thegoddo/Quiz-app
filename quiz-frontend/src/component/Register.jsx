// src/components/Register.js
import React, { useState } from "react";
import AuthService from "../services/auth.service"; // Import your auth service
import { useNavigate } from "react-router-dom"; // For navigation after signup

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // You might add a state for roles if you have a role selection input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccessful(false);

    try {
      const response = await AuthService.register(username, email, password, [
        "user",
      ]); // Defaulting to "user" role
      setMessage(response.message || "Registration successful!");
      setSuccessful(true);
      console.log("Register response:", response);
      navigate("/login");
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage || "Registration failed!");
      setSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {!successful && ( // Only show form if not successful yet
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Register</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
