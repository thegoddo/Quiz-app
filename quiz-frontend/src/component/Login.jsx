// src/components/Login.js
import React, { useState } from 'react';
import AuthService from '../services/auth.service'; // Import your auth service
import { useNavigate } from 'react-router-dom'; // For navigation after login

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      // Call the login service
      const response = await AuthService.login(username, password);
      setMessage('Login successful!');
      console.log('Login response:', response);
      // Navigate to home or dashboard after successful login
      navigate('/');
      window.location.reload(); // Optional: force a full reload to update Navbar etc.
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage || 'Login failed!');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;