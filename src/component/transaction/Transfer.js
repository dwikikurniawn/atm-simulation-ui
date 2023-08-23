import { Link, useNavigate } from "react-router-dom";
import Header from "../general-component/Header";
import { useState } from "react";
import { getUser } from "../utils/CommonsItem";
import axios from "axios";

const Transfer = () => {
  const accountNumber = getUser();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const navigate = useNavigate();

  const doTransfer = () => {
    setError(null);
    axios
      .post(
        `http://localhost:8087/transaction/api/transfer?accountNumber=${accountNumber}&amount=${amount}&recipientAccountNumber=${recipientAccountNumber}`
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
      <div class="field message-body">
        <label class="label">Transfer Amount</label>
        <div class="control">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            class="input"
            type="number"
            max={1000}
            min={10}
            placeholder="Enter transfer amount here..."
          />
        </div>
        <p class="help">
          Enter your transfer value with value from <strong>1</strong> until{" "}
          <strong>1000</strong>
        </p>
        <label class="label">Recipient Account Number</label>
        <div class="control">
          <input
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAccountNumber(e.target.value)}
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
          onClick={doTransfer}>
          Transfer
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

export default Transfer;
