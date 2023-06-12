import { Link, useParams } from "react-router-dom";

const Withdraw = () => {
  const { accountNumber } = useParams();
  return (
    <article class="message is-link">
      <div class="message-header">
        <img
          width="80"
          height="28"
          src="https://www.mitrais.com/wp-content/uploads/2019/11/Mitrais-Favicon.png"
        />
        <p>Withdraw</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="field message-body">
        <label class="label">Withdrawn Value</label>
        <div class="control">
          <input
            class="input"
            type="number"
            max={1000}
            min={0}
            placeholder="Enter withdrawn value here..."
          />
        </div>
        <p class="help">Enter your withdrawn value with multiplication<strong>10</strong></p>
        <button class="button is-link is-light is-small-medium is-outlined">
          Submit
        </button>
      </div>
      <div class="message-footer">
      <Link
        to={`/account/${accountNumber}`}
        className="button is-link is-light is-small is-outlined"
      >
        Back to Dashboard
      </Link>
      </div>
    </article>
  );
};

export default Withdraw;
