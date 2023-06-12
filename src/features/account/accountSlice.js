import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllAccounts = createAsyncThunk(
  "accounts/getAllAccounts",
  async () => {
    const response = await axios.get(`http://localhost:5002/accounts`);
    return response.data;
  }
);

const accountEntity = createEntityAdapter({
  selectId: (account) => account.accountNumber
});

const accountSlice = createSlice({
  name: "account",
  initialState: accountEntity.getInitialState(),
  extraReducers: {
    [getAllAccounts.fulfilled]: (state, action) => {
      accountEntity.setAll(state, action.payload);
    }
  },
});

export const accountSelectors = accountEntity.getSelectors(
  (state) => state.account
);
export default accountSlice.reducer;
