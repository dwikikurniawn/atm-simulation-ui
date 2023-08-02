import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountDashboard from "./component/account/AccountDashboard";
import Login from "./component/auth/Login";
import NotFound from "./NotFound";
import Transfer from "./component/transaction/Transfer";
import GetTransaction from "./component/transaction/GetTransaction";
import Deposit from "./component/transaction/Deposit";
import Withdraw from "./component/transaction/Withdraw";
import PublicRoutes from "./component/utils/PublicRoutes";
import PrivateRoutes from "./component/utils/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<AccountDashboard />} />
            <Route path="/transaction/history/" element={<GetTransaction />} />
            <Route path="/transaction/transfer/" element={<Transfer />} />
            <Route path="/transaction/withdraw/" element={<Withdraw />} />
            <Route path="/transaction/deposit/" element={<Deposit />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
