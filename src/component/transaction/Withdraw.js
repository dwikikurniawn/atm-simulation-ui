import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../general-component/Header";
import { getUser } from "../utils/CommonsItem";
import axios from "axios";
import { useFormik } from "formik";

const Withdraw = () => {
  const accountNumber = getUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
  });

  const doWithdraw = () => {
    setError(null);
    axios
      .post(
        `http://localhost:8087/transaction/api/withdraw?accountNumber=${accountNumber}&amount=${formik.values.amount}`
      )
      .then((response) => {
        console.log("Withdraw Response Code: " + response.code);
        alert("Withdraw succeed.");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.data != null) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <article class="message is-link">
      <Header title="Withdraw" />
      <div class="field message-body">
        <label class="label">Withdrawn Value</label>
        <div class="buttons">
          <button
            name="amount"
            class="button"
            value={10}
            onClick={formik.handleChange}>
            $10
          </button>
          <button
            name="amount"
            class="button"
            value={20}
            onClick={formik.handleChange}>
            $20
          </button>
          <button
            name="amount"
            class="button"
            value={50}
            onClick={formik.handleChange}>
            $50
          </button>
          <button
            name="amount"
            class="button"
            value={100}
            onClick={formik.handleChange}>
            $100
          </button>
        </div>
        <div class="control">
          <input
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            class="input"
            type="number"
            max={1000}
            min={10}
            placeholder="Enter withdrawn value here..."
          />
        </div>
        <p class="help">
          Enter your withdraw value with value from <strong>1</strong> until{" "}
          <strong>1000</strong>
        </p>
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <button
          class="button is-link is-light is-small-medium is-outlined"
          onClick={doWithdraw}>
          Submit
        </button>
      </div>
      <div class="message-footer">
        <Link
          to={`/dashboard`}
          className="button is-link is-light is-small is-outlined">
          Back to Dashboard
        </Link>
      </div>
    </article>
  );
};

export default Withdraw;
