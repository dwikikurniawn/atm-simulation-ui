import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllAccounts = createAsyncThunk(
  "accounts/getAllAccounts",
  async () => {
    const response = await axios.get(`http://localhost:8087/accounts`);
    return response.data;
  }
);

export const doLogin = createAsyncThunk(
  "api/login",
  async (accountNumber, pin) => {
    const response = await axios.post(
      `http://localhost:8087/api/login?accountNumber=${accountNumber}&pin=${pin}`
    );
    return response.data;
  }
);

const accountEntity = createEntityAdapter({
  selectId: (account) => account.accountNumber,
});

const accountSlice = createSlice({
  name: "account",
  initialState: accountEntity.getInitialState(),
  extraReducers: {
    [getAllAccounts.fulfilled]: (state, action) => {
      accountEntity.setAll(state, action.payload);
    },
  },
});

export const accountSelectors = accountEntity.getSelectors(
  (state) => state.account
);

export default accountSlice.reducer;
