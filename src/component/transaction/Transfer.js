import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../general-component/Header";
import { useState } from "react";
import { doTransferTransaction } from "../../features/transaction/transactionSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../general-component/CommonsItem";

const Transfer = () => {
  const accountNumber = getUser();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transactionType = "transfer";

  const transferTransaction = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      doTransferTransaction({
        amount,
        accountNumber,
        recipientAccountNumber,
        transactionType,
      })
    );
    const result = await response;
    alert("Transfer succeed.");
    navigate(`/dashboard`);
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
          onClick={transferTransaction}>
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
