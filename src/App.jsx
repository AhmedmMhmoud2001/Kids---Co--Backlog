import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Delivery from './pages/Delivery';
import Brands from './pages/Brands';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Main Layout - with Header, Navigation, Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home2" element={<Home2 />} />
            <Route path="shop" element={<Shop />} />
            <Route path="category/:category" element={<Category />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="account" element={<Account />} />
            <Route path="about" element={<About />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="brands" element={<Brands />} />
          </Route>

          {/* Auth Layout - Simple layout for auth pages */}
          <Route element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
