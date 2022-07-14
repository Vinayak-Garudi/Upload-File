import './App.css';
import Auth from './components/Auth';
import { Home } from './components/Home';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Auth />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
