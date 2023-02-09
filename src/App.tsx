import './App.css';
import ProductList from './features/productList/ProductList';
import Navbar from './features/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './features/cart/Cart';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
