import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../general-component/Header";
import { saveTransaction } from "../../features/transaction/transactionSlice";
import { useDispatch } from "react-redux";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const { accountNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Deposit amount: " + amount);
  }, []);

  const transactionType = "deposit";
  const addTransaction = async (e) => {
    e.preventDefault();
    await dispatch(saveTransaction({ amount, accountNumber, transactionType }));
    alert("Deposit succeed.");
    navigate(`/account/${accountNumber}`);
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
          Enter your deposit value with multiplication <strong>10</strong>
        </p>
        <button
          class="button is-link is-light is-small-medium is-outlined"
          onClick={addTransaction}>
          Submit
        </button>
      </div>
      <div class="message-footer">
        <Link
          to={`/account/${accountNumber}`}
          className="button is-link is-light is-small is-outlined">
          Back to Dashboard
        </Link>
      </div>
    </article>
  );
};

export default Deposit;
