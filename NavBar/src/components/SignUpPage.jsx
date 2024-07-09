import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setFEmail }) => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios
        .post("http:/localhost:8000/signup", {
          email,
          password,
        })
        .then((res) => {
          if ((res.data = "Exist")) {
            alert("User already exists");
          } else if ((res.data = "Not-Exist")) {
            history("/home", { state: { id: email } });
          }
        })

        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <h2>Welcome to Sign-Up page</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        <p>
          <b>Or</b>
        </p>
        <button>
          <Link to="/login" className="btn-link">
            Login
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Signup;
