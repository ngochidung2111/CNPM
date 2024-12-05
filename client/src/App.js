import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import HomePage from './pages/HomePage.tsx';
import Decontralization from './pages/Decontralization.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/Signup.tsx';
import InfoUser from './pages/InfoUser.tsx';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
