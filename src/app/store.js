import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import transactionReducer from '../features/transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    transaction: transactionReducer
  },
});
