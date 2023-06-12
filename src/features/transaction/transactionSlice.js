import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios";

export const getTransactions = createAsyncThunk("transactions/getTransactions", async() => {
    const response  = await axios.get('http://localhost:5002/transactions');
    return response.data;
});

export const saveTransaction = createAsyncThunk("transactions/saveTransaction", async({TransactionNumber, pin, name}) => {
    const response  = await axios.post('http://localhost:5002/transactions',{
        TransactionNumber,
        pin,
        name,
        transactions: [],
        balance: 350
    });
    return response.data;
});

export const updateTransaction = createAsyncThunk("transactions/updateTransaction", async({transactionNumber, pin, name}) => {
    const response  = await axios.patch(`http://localhost:5002/transactions/${transactionNumber}`,{
        transactionNumber,
        pin,
        name
    });
    return response.data;
});

export const deleteTransaction = createAsyncThunk("transactions/deleteTransactions", async(transactionNumber) => {
    await axios.delete(`http://localhost:5002/transactions/${transactionNumber}`);
    return transactionNumber;
});

const transactionEntity = createEntityAdapter({
    selectId: (transaction) => transaction.id
});

const transactionSlice = createSlice({
    name: "transaction",
    initialState:transactionEntity.getInitialState(),
    extraReducers:{
        [getTransactions.fulfilled] : (state, action) => {
            transactionEntity.setAll(state, action.payload);
        },
        [saveTransaction.fulfilled] : (state, action) => {
            transactionEntity.addOne(state, action.payload);
        },
        [updateTransaction.fulfilled] : (state, action) => {
            transactionEntity.updateOne(state, {transactionNumber: action.payload.transactionNumber, updates:action.payload});
        },
        [deleteTransaction.fulfilled] : (state, action) => {
            transactionEntity.removeOne(state, action.payload);
        }
    }
});

export const transactionSelectors = transactionEntity.getSelectors(state => state.transaction);
export default transactionSlice.reducer;