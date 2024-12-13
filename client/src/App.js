import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import HomePage from './pages/HomePage.tsx';
import Authorization from './pages/Authorization.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/Signup.tsx';
import InfoUser from './pages/InfoUser.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import PrintPage from './pages/PrintPage.tsx';
import PurchasePage from './pages/PurchasePage.tsx';
import PurchaseHistory from './pages/PurchaseHistory.tsx';

import Config from './pages/Config.tsx';
import PrintManagement from './pages/PrintManagement.tsx';
import PrintHistory from './pages/PrintHistorySSPS.tsx';
import PrintPageManagement from './pages/PageManagementSSPS.tsx';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="authorization" element={<Authorization />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<InfoUser />} />
          <Route path="/print" element={<PrintPage/>}/>
          <Route path="/purchase" element={<PurchasePage/>} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path='/purchasehistory' element={<PurchaseHistory/>}/>
          <Route path="/config" element={<Config/>} />
          <Route path="/printmanagement" element={<PrintManagement/>} />
          <Route path="/printhistory" element={<PrintHistory />} />
          <Route path="/trangin" element={<PrintPageManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
