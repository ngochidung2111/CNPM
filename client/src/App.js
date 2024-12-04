import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Config from './pages/Config.tsx';
import PrintManagement from './pages/PrintManagement.tsx';
import PrintHistory from './pages/PrintHistorySSPS.tsx';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/config" element={<Config/>} />
          <Route path="/printmanagement" element={<PrintManagement/>} />
          <Route path="/printhistory" element={<PrintHistory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
