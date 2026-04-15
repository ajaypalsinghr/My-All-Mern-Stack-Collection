import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Billing from './pages/Billing';
import Invoice from './pages/Invoice';
function App() {
  // LocalStorage se data load karna (Initial State)
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem("hotelMenu");
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  // Jab bhi menu change ho, LocalStorage update karo
  useEffect(() => {
    localStorage.setItem("hotelMenu", JSON.stringify(menu));
  }, [menu]);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-6">
          <Routes>
            {/* Props ke zariye menu aur setMenu ko Admin page mein bhej rahe hain */}
            <Route path="/admin" element={<Admin menu={menu} setMenu={setMenu} />} />
            <Route path="/billing" element={<Billing menu={menu} />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/" element={<Billing menu={menu} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;