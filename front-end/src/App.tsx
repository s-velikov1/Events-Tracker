import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { useState, createContext } from 'react';

export const AppContext = createContext<any>({});

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <AppContext.Provider value={ { user, setUser } }>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
