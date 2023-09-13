import { Link, useNavigate } from "react-router-dom";
import Header from "../general-component/Header";
import { useState } from "react";
import { getUser } from "../utils/CommonsItem";
import axios from "axios";
import { useFormik } from "formik";

const Transfer = () => {
  const accountNumber = getUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      amount: "",
      recipientAccountNumber: "",
    },
    onSubmit: (values) => {
      console.log("Form Data: ", values);
      doTransfer();
    },
  });

  const doTransfer = () => {
    setError(null);
    axios
      .post(
        `http://localhost:8087/transaction/api/transfer?accountNumber=${accountNumber}&amount=${formik.values.amount}&recipientAccountNumber=${formik.values.recipientAccountNumber}`
      )
      .then(() => {
        alert("Transfer succeed.");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.data != null) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <article class="message is-link">
      <Header title="Transfer" />
      <form onSubmit={formik.handleSubmit}>
        <div class="field message-body">
          <label class="label">Transfer Amount</label>
          <div class="control">
            <input
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              class="input"
              type="number"
              max={1000}
              min={10}
              placeholder="Enter transfer amount here..."
            />
          </div>
          <p class="help">
            Enter your transfer value with value from <strong>10</strong> until{" "}
            <strong>1000</strong>
          </p>
          <label class="label">Recipient Account Number</label>
          <div class="control">
            <input
              name="recipientAccountNumber"
              value={formik.values.recipientAccountNumber}
              onChange={formik.handleChange}
              class="input"
              type="number"
              maxLength={6}
              placeholder="Enter recipient account number here..."
            />
          </div>
          {error && (
            <>
              <small style={{ color: "red" }}>{error}</small>
              <br />
            </>
          )}
          <br />
          <button
            class="button is-link is-light is-small-medium is-outlined"
            // onClick={doTransfer}
          >
            Transfer
          </button>
        </div>
      </form>
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

export default Transfer;
