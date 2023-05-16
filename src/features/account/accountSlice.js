import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios";

export const getAccounts = createAsyncThunk("accounts/getAccounts", async() => {
    const response  = await axios.get('http://localhost:5002/accounts');
    return response.data;
});

export const saveAccount = createAsyncThunk("accounts/saveAccount", async({accountNumber, pin, name}) => {
    const response  = await axios.post('http://localhost:5002/accounts',{
        accountNumber,
        pin,
        name,
        transactions: [],
        balance: 350
    });
    return response.data;
});

export const updateAccount = createAsyncThunk("accounts/updateAccount", async({accountNumber, pin, name}) => {
    const response  = await axios.patch(`http://localhost:5002/accounts/${accountNumber}`,{
        accountNumber,
        pin,
        name
    });
    return response.data;
});

export const deleteAccount = createAsyncThunk("accounts/deleteAccounts", async(accountNumber) => {
    await axios.delete(`http://localhost:5002/accounts/${accountNumber}`);
    return accountNumber;
});

const accountEntity = createEntityAdapter({
    selectId: (account) => account.accountNumber
});

const accountSlice = createSlice({
    name: "account",
    initialState:accountEntity.getInitialState(),
    extraReducers:{
        [getAccounts.fulfilled] : (state, action) => {
            accountEntity.setAll(state, action.payload);
        },
        [saveAccount.fulfilled] : (state, action) => {
            accountEntity.addOne(state, action.payload);
        },
        [updateAccount.fulfilled] : (state, action) => {
            accountEntity.updateOne(state, {accountNumber: action.payload.accountNumber, updates:action.payload});
        },
        [deleteAccount.fulfilled] : (state, action) => {
            accountEntity.removeOne(state, action.payload);
        }
    }
});

export const accountSelectors = accountEntity.getSelectors(state => state.Account);
export default accountSlice.reducer;