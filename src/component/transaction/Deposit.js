import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../general-component/Header";
import { saveTransaction } from "../../features/transaction/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../utils/CommonsItem";
import axios from "axios";
import { unwrapResult } from "@reduxjs/toolkit";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  // const error = useSelector((state) => state.transaction.errorMessage);
  const accountNumber = getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Deposit amount: " + amount);
  }, []);

  const transactionType = "deposit";
  const addTransaction = async (e) => {
    e.preventDefault();
    await dispatch(saveTransaction({ amount, accountNumber, transactionType }))
      .then(unwrapResult)
      .then((response) => {
        alert("Deposit succeed.");
        navigate(`/dashboard`);
        console.log({ response });
      })
      .catch((error) => {
        console.log({ responseErr: error });
      });
  };

  const doDeposit = () => {
    setError(null);
    axios
      .post(
        `http://localhost:8087/transaction/api/${transactionType}?accountNumber=${accountNumber}&amount=${amount}`
      )
      .then((response) => {
        alert("Deposit succeed.");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.data != null) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <article class="message is-link">
      <Header title="Deposit" />
      <div class="field message-body">
        <label class="label">Deposit Value</label>
        <div class="buttons">
          <button
            class="button"
            value={10}
            onClick={(e) => setAmount(e.target.value)}>
            $10
          </button>
          <button
            class="button"
            value={20}
            onClick={(e) => setAmount(e.target.value)}>
            $20
          </button>
          <button
            class="button"
            value={50}
            onClick={(e) => setAmount(e.target.value)}>
            $50
          </button>
          <button
            class="button"
            value={100}
            onClick={(e) => setAmount(e.target.value)}>
            $100
          </button>
        </div>
        <div class="control">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            class="input"
            type="number"
            max={1000}
            min={10}
            placeholder="Enter deposit value here..."
          />
        </div>
        <p class="help">
          Enter your deposit value with value from <strong>1</strong> until{" "}
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
          onClick={doDeposit}>
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

export default Deposit;
