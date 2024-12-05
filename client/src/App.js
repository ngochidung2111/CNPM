import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import HomePage from './pages/HomePage.tsx';
import Decontralization from './pages/Decontralization.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/Signup.tsx';
import InfoUser from './pages/InfoUser.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import PrintPage from './pages/PrintPage.tsx';
import PurchasePage from './pages/PurchasePage.tsx';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="phanquyen" element={<Decontralization />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<InfoUser />} />
          <Route path="/print" element={<PrintPage/>}/>
          <Route path="/purchase" element={<PurchasePage/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
