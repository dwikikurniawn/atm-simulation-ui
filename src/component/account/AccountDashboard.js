import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  accountSelectors,
  getAllAccounts,
} from "../../features/account/accountSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../general-component/Header";
import { getUser, removeUserSession } from "../utils/CommonsItem";

const AccountDashboard = () => {
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const accountNumber = getUser();
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
      <Header title="Dashboard" />
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
                <Link to={`/transaction/transfer`}>Transfer</Link>
              </li>
              <li>
                <Link to={`/transaction/withdraw`}>Withdraw</Link>
              </li>
              <li>
                <Link to={`/transaction/deposit`}>Deposit</Link>
              </li>
              <li>
                <Link to={`/transaction/history`}>Transaction History</Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default AccountDashboard;
