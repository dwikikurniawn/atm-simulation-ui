import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  accountSelectors,
  getAllAccounts,
} from "../../features/account/accountSlice";
import { Link, useParams } from "react-router-dom";

const AccountDashboard = () => {
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");

  const { accountNumber } = useParams();
  const dispatch = useDispatch();
  const account = useSelector((state) =>
    accountSelectors.selectById(state, accountNumber)
  );

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  useEffect(() => {
    console.log("account: " + account);
    if (account) {
      setBalance(account.balance);
      setName(account.name);
    }
  }, [account]);

  return (
    <article class="message is-link">
      <div class="message-header">
        <img width="80" height="28" src="https://www.mitrais.com/wp-content/uploads/2019/11/Mitrais-Favicon.png" />
        <>Dashboard</>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="box mt-5">
        <div class="card-content">
          <aside class="menu">
            <p class="menu-label title is-4">Your Account</p>
            <ul class="menu-list">
              <li class="content is-4">Name: {name}</li>
              <li class="content is-4">Balance: {balance}</li>
              <li class="content is-4">Account Number: {accountNumber}</li>
            </ul>
          </aside>
          </div>
          <div class="card-content">
          <aside class="menu">
            <p class="menu-label title is-4 ">Transactions</p>
            <ul class="menu-list">
              <li>
                <Link to={`/transaction/transfer/${accountNumber}`}>
                  Transfer
                </Link>
              </li>
              <li>
                <Link to={`/transaction/withdraw/${accountNumber}`}>
                  Withdraw
                </Link>
              </li>
              <li>
                <Link to={`/transaction/history/${accountNumber}`}>
                  Transaction History
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default AccountDashboard;