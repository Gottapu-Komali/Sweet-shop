import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Home from './routes/index';
import Shop from './routes/shop';
import Categories from './routes/categories';
import ProductDetail from './routes/product';
import About from './routes/about';
import Contact from './routes/contact';
import Cart from './routes/cart';
import Checkout from './routes/checkout';
import FAQ from './routes/faq';
import Policies from './routes/policies';
import ThankYou from './routes/thank-you';
import NotFound from './routes/not-found';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/menu" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;