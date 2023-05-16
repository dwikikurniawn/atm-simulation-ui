import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountDashboard from './component/account/AccountDashboard';
import Login from './component/account/Login';
import Transfer from './component/transaction/Transfer';
import OtherTransfer from './component/transaction/OtherTransfer';
import Withdraw from './component/transaction/withdraw';
import GetTransaction from './component/transaction/GetTransaction';
import NotFound from './NotFound';

function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/account" element={<AccountDashboard/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/transaction" element={<GetTransaction/>}/>
      <Route path="/transaction/transfer" element={<Transfer/>}/>
      <Route path="/transaction/transfer/other" element={<OtherTransfer/>}/>
      <Route path="/transaction/withdraw" element={<Withdraw/>}/>
      <Route path="/not-found" element={<NotFound/>}/>
      <Route component={NotFound}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
