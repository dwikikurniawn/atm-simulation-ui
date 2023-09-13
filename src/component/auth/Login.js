import { useState } from "react";
import Header from "../general-component/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../utils/CommonsItem";
import { useFormik } from "formik";

const Login = () => {
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      pin: "",
    },
    onSubmit: (values) => {
      console.log("Form Data: ", values);
      handleLogin();
    },
  });

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:8087/api/login", {
        accountNumber: formik.values.accountNumber,
        pin: formik.values.pin,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.accountNumber);
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
      <form onSubmit={formik.handleSubmit}>
        <div class="field message-body">
          <label class="label">ACCOUNT NUMBER</label>
          <div class="control">
            <input
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              class="input"
              type="number"
              maxLength={6}
              placeholder="Enter your account number here..."
            />
            <p class="help">
              <strong>Enter your account number correctly</strong>
            </p>
          </div>
          <div class="control" style={{ marginTop: 20 }}>
            <label class="label">PIN</label>
            <input
              name="pin"
              value={formik.values.pin}
              onChange={formik.handleChange}
              class="input"
              type="password"
              maxLength={6}
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
          <button
            class="button is-link is-light is-small-medium is-outlined"
            disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </article>
  );
};

export default Login;
