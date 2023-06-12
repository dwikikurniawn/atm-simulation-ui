import { Link, useParams } from "react-router-dom";

const Transfer = () => {
  const { accountNumber } = useParams();

  return (
    <article class="message is-link">
      <div class="message-header">
        <img
          width="80"
          height="28"
          src="https://www.mitrais.com/wp-content/uploads/2019/11/Mitrais-Favicon.png"
        />
        <p>Transfer</p>
        <i class="fa-solid fa-user"></i>
        <button class="delete" aria-label="delete"></button>
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

export default Transfer;
