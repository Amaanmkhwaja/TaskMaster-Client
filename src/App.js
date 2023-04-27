import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { auth } from './Firebase';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="text-[#1aac83]">
      <BrowserRouter>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {user ? (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          ) : (
            <Login setUser={setUser}/>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
