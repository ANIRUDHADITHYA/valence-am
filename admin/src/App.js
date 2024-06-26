import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import { AuthProvider } from './ContextAPI/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddProduct from './Pages/AddProduct/AddProduct';
import Orders from './Pages/Orders/Orders';
import { OrderProvider } from './ContextAPI/OrderContext';
import Order from './Pages/Orders/Order';
import UpdateProduct from './Pages/UpdateProduct/UpdateProduct';
import HideProduct from './Pages/HideProduct/HideProduct';
import ShowProduct from './Pages/ShowProduct/ShowProduct';
import AccountHolders from './Pages/AccountHolders/AccountHolders';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <OrderProvider>
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
              <Route path="/add-product" element={<ProtectedRoute element={AddProduct} />} />
              <Route path="/update-product" element={<ProtectedRoute element={UpdateProduct} />} />
              <Route path="/hide-product" element={<ProtectedRoute element={HideProduct} />} />
              <Route path="/show-product" element={<ProtectedRoute element={ShowProduct} />} />
              <Route path="/orders" element={<ProtectedRoute element={Orders} />} />
              <Route path="/orders/:orderID" element={<ProtectedRoute element={Order} />} />
              <Route path="/account-holders" element={<ProtectedRoute element={AccountHolders} />} />
            </Routes>
          </OrderProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
