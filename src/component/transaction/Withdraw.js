import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../general-component/Header";
import { saveTransaction } from "../../features/transaction/transactionSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../utils/CommonsItem";
import axios from "axios";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const accountNumber = getUser();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transactionType = "withdraw";

  const addTransaction = async (e) => {
    e.preventDefault();
    await dispatch(saveTransaction({ amount, accountNumber, transactionType }));
    alert("Withdraw succeed.");
    navigate(`/dashboard`);
  };

  const doWithdraw = () => {
    setError(null);
    axios
      .post(
        `http://localhost:8087/transaction/api/${transactionType}?accountNumber=${accountNumber}&amount=${amount}`
      )
      .then((response) => {
        alert("Withdraw succeed.");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.data != null) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  useEffect(() => {
    console.log("withdrawn amount: " + amount);
  }, []);

  return (
    <article class="message is-link">
      <Header title="Withdraw" />
      <div class="field message-body">
        <label class="label">Withdrawn Value</label>
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
            placeholder="Enter withdrawn value here..."
          />
        </div>
        <p class="help">
          Enter your withdrawn value with multiplication <strong>10</strong>
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
