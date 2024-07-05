import React, { useEffect, useState } from "react";

const Login = ({ setFEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate({ email, password });
    if (Object.keys(validationErrors).length === 0) {
      console.log("Email:", email);
      console.log("Password:", password);

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      setFEmail(email);

      setEmail("");
      setPassword("");
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@gmail\.com$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }

    return errors;
  };

  return (
    <div className="login-container">
      <h2>Welcome to login page</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password:</label>
        <input
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>
      </form>

      <div className="stored-values">
        <h3>Stored Values</h3>
        <p>Email: {localStorage.getItem("email") || "No email stored"}</p>
        <p>
          Password: {localStorage.getItem("password") || "No password stored"}
        </p>
      </div>
    </div>
  );
};

export default Login;
