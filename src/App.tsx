import './App.css';
import Navbar from './features/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './features/cart/Cart';
import { Toaster } from 'react-hot-toast';
import ProductPage from './features/productPage/ProductPage';
import Homepage from './features/homepage/Homepage';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Toaster/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
