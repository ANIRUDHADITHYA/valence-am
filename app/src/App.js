import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage/Homepage';
import Products from './Pages/Products/Products';
import MyCart from './Pages/MyCart/MyCart';
import LostPassword from './Pages/LostPassword/LostPassword';
import ProductSummary from './Pages/Products/ProductSummary';
import BecomeASupplier from './Pages/BecomeASupplier/BecomeASupplier';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import PrivacyPolicy from './Pages/PAT/PrivacyPolicy';
import TermsOfUse from './Pages/PAT/TermsOfUse';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import { AuthProvider } from './ContextAPI/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productID" element={<ProductSummary />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/my-cart" exact element={<MyCart />} />
          <Route path="/become-a-supplier" exact element={<BecomeASupplier />} />
          <Route path="/lost-password" exact element={<LostPassword />} />
          <Route path="/reset-password/:resetToken" exact element={<ResetPassword />} />
          <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" exact element={<TermsOfUse />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
