import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="card">
            <div className="card-body">
              <br />
              <form>
                <h2>
                  <a className="navbar-brand" style={{ color: "blue" }}>
                    Quiz App
                  </a>
                </h2>
                <h3 className="text-center">Register</h3>
                <div className="form-group mb-2">
                  <label for="username">Username </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleUsername}
                    value={username}
                    id="username"
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label for="email">Email </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleEmail}
                    value={email}
                    id="email"
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label for="username">Password </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handlePassword}
                    value={password}
                    id="password"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
