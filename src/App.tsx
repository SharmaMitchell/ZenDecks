import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

function App() {
  
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme={theme}>
      <Router>
        <Navbar switchTheme={switchTheme} theme={theme}/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
