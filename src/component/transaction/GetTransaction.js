import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTransactions,
  transactionSelectors,
} from "../../features/transaction/transactionSlice";
import { Link, useParams } from "react-router-dom";

const GetTransaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(transactionSelectors.selectAll);
  const { accountNumber } = useParams();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    // <div class='container'>
    <article class="message is-link">
      <div class="message-header">
      <img class="is-rounded" width="80" height="28" src="https://www.mitrais.com/wp-content/uploads/2019/11/Mitrais-Favicon.png" />
        <p>Transaction History</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div className="box mt-5">
        <table className="table is-striped is-fullwidth">
          <thead class="thead-dark">
            <tr>
              <th>No</th>
              <th>Source Account Number</th>
              <th>Transaction Type</th>
              <th>Recipient Account Number</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.sourceAccountNumber}</td>
                <td>{transaction.transactionName}</td>
                <td>{transaction.recipientAccountNumber}</td>
                <td>${transaction.amount}</td>
              </tr>
            ))}
            <tr>
              <Link
                to={`/account/${accountNumber}`}
                className="button is-link is-light is-small is-outlined"
              >
                Back to Dashboard
              </Link>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default GetTransaction;
