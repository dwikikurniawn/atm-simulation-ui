import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (accountNumber) => {
    const response = await axios.get(
      "http://localhost:8087/transaction/api/history?accountNumber=" +
        accountNumber
    );
    return response.data;
  }
);

export const saveTransaction = createAsyncThunk(
  "transactions/saveTransaction",
  async ({ amount, accountNumber, transactionType }) => {
    const response = await axios.post(
      `http://localhost:8087/transaction/api/${transactionType}?accountNumber=${accountNumber}&amount=${amount}`
    );
    console.log("response: " + JSON.stringify(response));
    return response;
  }
);

export const doTransferTransaction = createAsyncThunk(
  "transactions/transferTransaction",
  async ({ amount, accountNumber, recipientAccountNumber }) => {
    const response = await axios.post(
      `http://localhost:8087/transaction/api/transfer?accountNumber=${accountNumber}&amount=${amount}&recipientAccountNumber=${recipientAccountNumber}`
    );
    return response;
  }
);

const transactionEntity = createEntityAdapter({
  selectId: (transaction) => transaction.id,
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState: transactionEntity.getInitialState(),
  extraReducers: {
    [getTransactions.fulfilled]: (state, action) => {
      transactionEntity.setAll(state, action.payload);
    },
    [saveTransaction.fulfilled]: (state, action) => {
      transactionEntity.addOne(state, action.payload);
    },
    [saveTransaction.rejected]: (state, { error }) => {
      state.errorMessage = error.message;
    },
    [doTransferTransaction.fulfilled]: (state, action) => {
      transactionEntity.addOne(state, action.payload);
    },
  },
});

export const transactionSelectors = transactionEntity.getSelectors(
  (state) => state.transaction
);
export default transactionSlice.reducer;
