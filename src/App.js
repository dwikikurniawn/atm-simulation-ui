import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountDashboard from './component/account/AccountDashboard';
import Login from './component/auth/Login';
import NotFound from './NotFound';
import Transfer from './component/transaction/Transfer';
import GetTransaction from './component/transaction/GetTransaction';
import Deposit from './component/transaction/Deposit';
import Withdraw from './component/transaction/Withdraw';

function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/account/:accountNumber" element={<AccountDashboard/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/transaction/history/:accountNumber" element={<GetTransaction/>}/>
      <Route path="/transaction/transfer/:accountNumber" element={<Transfer/>}/>
      <Route path="/transaction/withdraw/:accountNumber" element={<Withdraw/>}/>
      <Route path="/transaction/deposit/:accountNumber" element={<Deposit/>}/>
      <Route path="/not-found" element={<NotFound/>}/>
      <Route component={NotFound}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
