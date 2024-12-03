import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import PrintPage from './pages/PrintPage.tsx';
import PurchasePage from './pages/PurchasePage.tsx';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/print" element={<PrintPage/>}/>
          <Route path="/purchase" element={<PurchasePage/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
