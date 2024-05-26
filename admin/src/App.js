import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import { AuthProvider } from './ContextAPI/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddProduct from './Pages/AddProduct/AddProduct';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/add-product" element={<ProtectedRoute element={AddProduct} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
