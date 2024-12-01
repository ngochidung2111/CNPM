import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
