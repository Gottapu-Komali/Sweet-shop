import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Gifting from './pages/Gifting';
import FestivalSpecials from './pages/FestivalSpecials';
import AIChatBot from './components/AIChatBot';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/gifting" element={<Gifting />} />
                <Route path="/festivals" element={<FestivalSpecials />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <AIChatBot />
          </div>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
