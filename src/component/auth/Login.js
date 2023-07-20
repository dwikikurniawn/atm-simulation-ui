import { useEffect, useState } from "react";
import Header from "../general-component/Header";
import { Link } from "react-router-dom";

const Login = () => {
  
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');

    return (
      <article class="message is-link">
        <Header title="Login Page" />
        <div class="field message-body">
          <label class="label">ACCOUNT NUMBER</label>
          <div class="control">
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              class="input"
              type="number"
              max={1000}
              min={10}
              placeholder="Enter your account number here..."
            />
                      <p class="help">
          <strong>Enter your account number correctly</strong>
          </p>
          </div>
          <div class="control">
            <label class="label">PIN</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="input"
              type="password"
              max={1000}
              min={10}
              placeholder="Enter your pin here..."
            />
          <p class="help">
          <strong>Enter your pin correctly</strong>
          </p>
          </div>
          <Link to={`/account/${accountNumber}`}
                    className="button is-link is-light is-small is-outlined">
                  Submit
          </Link>
          {/* <button class="button is-link is-light is-small-medium is-outlined">
            Submit
          </button> */}
        </div>
      </article>
    );
  };

export default Login; 