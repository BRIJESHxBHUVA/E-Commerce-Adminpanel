import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/*' element={<Login/>} />
        <Route path='/adminpanel/*' element={<Home/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
