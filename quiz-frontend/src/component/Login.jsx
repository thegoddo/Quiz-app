import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md6 offset-md-3">
            <div className="card-body">
              <form>
                <h2>
                  <a
                    className="navbar-brand text-center"
                    style={{ color: "blue" }}
                  >
                    Quiz App
                  </a>
                </h2>
                <h3 className="text-center">Login</h3>
                <br />
                <div className="form-group mb-2">
                  <label for="email" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmail}
                    id="email"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group mb-2">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="form-control"
                    id="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
