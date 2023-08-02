import { useEffect, useState } from "react";
import Header from "../general-component/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../utils/CommonsItem";

const Login = () => {
  const history = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:8087/api/login", {
        accountNumber: accountNumber,
        pin: pin,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.accountNumber);
        delay(3000);
        history("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data != null) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <article class="message is-link">
      <Header title="Login Page" />
      <div class="field message-body">
        <label class="label">ACCOUNT NUMBER</label>
        <div class="control">
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            class="input"
            type="number"
            max={1000}
            min={10}
            placeholder="Enter your account number here..."
          />
          <p class="help">
            <strong>Enter your account number correctly</strong>
          </p>
        </div>
        <div class="control" style={{ marginTop: 20 }}>
          <label class="label">PIN</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            class="input"
            type="password"
            max={1000}
            min={10}
            placeholder="Enter your pin here..."
          />
          <p class="help">
            <strong>Enter your pin correctly</strong>
          </p>
        </div>
        {error && (
          <>
            <small style={{ color: "red", fontSize: 18 }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <input
          className="button is-link is-light is-small is-outlined"
          type="button"
          value={loading ? "Loading..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
        <br />
      </div>
    </article>
  );
};

export default Login;
