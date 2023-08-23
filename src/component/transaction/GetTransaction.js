import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTransactions,
  transactionSelectors,
} from "../../features/transaction/transactionSlice";
import { Link } from "react-router-dom";
import Header from "../general-component/Header";
import { getUser } from "../utils/CommonsItem";

const GetTransaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(transactionSelectors.selectAll);
  const accountNumber = getUser();

  useEffect(() => {
    dispatch(getTransactions(accountNumber));
  }, [dispatch]);

  return (
    <article class="message is-link">
      <Header title="Transaction History" />
      <div className="box mt-5">
        <table className="table is-striped is-fullwidth">
          <thead class="thead-dark">
            <tr>
              <th>No</th>
              <th>Source Account Number</th>
              <th>Transaction Type</th>
              <th>Datetime</th>
              <th>Recipient Account Number</th>
              <th>Amount</th>
              <th>Reference Number</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length !== 0 ? (
              transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.sourceAccountNumber}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.time}</td>
                  <td>{transaction.recipientAccountNumber}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.referenceNumber}</td>
                </tr>
              ))
            ) : (
              <div class="message-body">No Transactions</div>
            )}
            <tr>
              <Link
                to={`/dashboard`}
                className="button is-link is-light is-small is-outlined">
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
